import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { NotificationService } from '../notifications/notification.service';
import { ActivityStatus, InquiryStatus } from '@prisma/client';
import { CreateContactInquiryDto } from './dto/create-contact-inquiry.dto';
import { UpdateContactInquiryDto } from './dto/update-contact-inquiry.dto';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { buildPaginatedResponse, IPaginatedResult, sanitizeSort, sanitizeSearch } from '@common/helpers/pagination.helper';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService,
  ) {}

  /**
   * Submit new contact inquiry (Public).
   */
  async create(
    dto: CreateContactInquiryDto,
    ipAddress?: string,
    userAgent?: string,
  ) {
    const inquiry = await this.prisma.contactInquiry.create({
      data: {
        name: dto.name.trim(),
        email: dto.email.trim().toLowerCase(),
        phone: dto.phone ? dto.phone.trim() : null,
        company: dto.company ? dto.company.trim() : null,
        service: dto.service || null,
        subject: dto.subject || 'Website Contact Inquiry',
        message: dto.message,
        source: dto.source || 'website',
        status: InquiryStatus.NEW,
        priority: 'MEDIUM',
        ipAddress: ipAddress || null,
        userAgent: userAgent || null,
      },
    });

    // Enqueue background email alert for admins
    try {
      await this.notificationService.queueNotification({
        type: 'EMAIL',
        template: 'system/security-alert',
        recipient: process.env.CONTACT_EMAIL || 'support@coreslash.com',
        subject: `New Contact Inquiry: ${inquiry.subject}`,
        data: {
          subject: inquiry.subject,
          message: `New inquiry from ${inquiry.name} (${inquiry.email}). Message: ${inquiry.message.slice(0, 150)}...`,
        },
        eventId: `inquiry_${inquiry.id}`,
      });
    } catch (err) {
      this.logger.warn(`Failed to enqueue contact inquiry notification: ${err}`);
    }

    return {
      message: 'Thank you for reaching out! Your inquiry has been received.',
      inquiryId: inquiry.id,
    };
  }

  /**
   * Admin paginated inquiry list.
   */
  async findAll(
    query: PaginationQueryDto & {
      inquiryStatus?: InquiryStatus;
      priority?: string;
      isArchived?: boolean;
      assignedToId?: number;
    },
  ): Promise<IPaginatedResult<any>> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const sortBy = sanitizeSort(query.sortBy, ['createdAt', 'updatedAt', 'priority', 'status', 'name'], 'createdAt');
    const search = sanitizeSearch(query.search);

    const where: any = {
      deletedAt: null,
    };

    if (query.inquiryStatus) {
      where.status = query.inquiryStatus;
    }

    if (query.priority) {
      where.priority = query.priority;
    }

    if (query.isArchived !== undefined) {
      where.isArchived = Boolean(query.isArchived);
    }

    if (query.assignedToId) {
      where.assignedToId = query.assignedToId;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.contactInquiry.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: query.sortOrder || 'desc' },
        include: {
          assignedTo: {
            select: { id: true, name: true, email: true, role: true },
          },
        },
      }),
      this.prisma.contactInquiry.count({ where }),
    ]);

    return buildPaginatedResponse(items, total, page, limit);
  }

  /**
   * Admin find single inquiry detail.
   */
  async findOne(id: number) {
    const inquiry = await this.prisma.contactInquiry.findFirst({
      where: { id, deletedAt: null },
      include: {
        assignedTo: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });

    if (!inquiry) {
      throw new NotFoundException(`Contact inquiry #${id} not found`);
    }

    // Auto-mark as read when inspected by admin
    if (!inquiry.isRead) {
      await this.prisma.contactInquiry.update({
        where: { id },
        data: { isRead: true },
      });
    }

    return inquiry;
  }

  /**
   * Admin update inquiry.
   */
  async update(id: number, dto: UpdateContactInquiryDto, userId?: number) {
    const inquiry = await this.prisma.contactInquiry.findFirst({
      where: { id, deletedAt: null },
    });
    if (!inquiry) {
      throw new NotFoundException(`Contact inquiry #${id} not found`);
    }

    if (dto.assignedToId) {
      const assignee = await this.prisma.user.findFirst({
        where: { id: dto.assignedToId, deletedAt: null },
      });
      if (!assignee) {
        throw new BadRequestException(`Assigned user #${dto.assignedToId} not found`);
      }
    }

    const isCompleting = dto.status === InquiryStatus.COMPLETED;

    const updated = await this.prisma.contactInquiry.update({
      where: { id },
      data: {
        status: dto.status || inquiry.status,
        priority: dto.priority || inquiry.priority,
        notes: dto.notes !== undefined ? dto.notes : inquiry.notes,
        isRead: dto.isRead !== undefined ? dto.isRead : inquiry.isRead,
        isArchived: dto.isArchived !== undefined ? dto.isArchived : inquiry.isArchived,
        assignedToId: dto.assignedToId !== undefined ? dto.assignedToId : inquiry.assignedToId,
        followUpDate: dto.followUpDate ? new Date(dto.followUpDate) : inquiry.followUpDate,
        resolvedAt: isCompleting ? new Date() : inquiry.resolvedAt,
        updatedBy: userId || null,
      },
      include: {
        assignedTo: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'INQUIRY_UPDATE',
          module: 'CONTACT',
          recordId: id,
          description: `Updated contact inquiry #${id} (Status: ${updated.status})`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return updated;
  }

  /**
   * Admin archive inquiry.
   */
  async archive(id: number, userId?: number) {
    const inquiry = await this.prisma.contactInquiry.findFirst({
      where: { id, deletedAt: null },
    });
    if (!inquiry) {
      throw new NotFoundException(`Contact inquiry #${id} not found`);
    }

    const updated = await this.prisma.contactInquiry.update({
      where: { id },
      data: {
        isArchived: true,
        updatedBy: userId || null,
      },
    });

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'INQUIRY_ARCHIVE',
          module: 'CONTACT',
          recordId: id,
          description: `Archived contact inquiry #${id}`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return updated;
  }

  /**
   * Soft delete contact inquiry.
   */
  async remove(id: number, userId?: number) {
    const inquiry = await this.prisma.contactInquiry.findFirst({
      where: { id, deletedAt: null },
    });
    if (!inquiry) {
      throw new NotFoundException(`Contact inquiry #${id} not found`);
    }

    await this.prisma.contactInquiry.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        updatedBy: userId || null,
      },
    });

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'INQUIRY_DELETE',
          module: 'CONTACT',
          recordId: id,
          description: `Soft deleted contact inquiry #${id}`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return { message: `Contact inquiry #${id} deleted successfully` };
  }
}
