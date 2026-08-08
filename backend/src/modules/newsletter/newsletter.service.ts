import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { PrismaService } from '@database/prisma.service';
import { NotificationService } from '../notifications/notification.service';
import { ActivityStatus, Status } from '@prisma/client';
import { SubscribeNewsletterDto } from './dto/subscribe-newsletter.dto';
import { UnsubscribeNewsletterDto } from './dto/unsubscribe-newsletter.dto';
import { PaginationQueryDto } from '@common/dto/pagination-query.dto';
import { buildPaginatedResponse, IPaginatedResult, sanitizeSort, sanitizeSearch } from '@common/helpers/pagination.helper';

@Injectable()
export class NewsletterService {
  private readonly logger = new Logger(NewsletterService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService,
  ) {}

  /**
   * Public subscribe.
   */
  async subscribe(dto: SubscribeNewsletterDto) {
    const normalizedEmail = dto.email.trim().toLowerCase();
    const unsubscribeToken = crypto.randomBytes(24).toString('hex');

    let subscriber = await this.prisma.newsletterSubscriber.findFirst({
      where: { email: normalizedEmail },
    });

    if (subscriber) {
      if (subscriber.status === Status.ACTIVE && subscriber.deletedAt === null) {
        return { message: 'Email is already subscribed to our newsletter.' };
      }

      subscriber = await this.prisma.newsletterSubscriber.update({
        where: { id: subscriber.id },
        data: {
          status: Status.ACTIVE,
          deletedAt: null,
          unsubscribeToken,
          subscribedAt: new Date(),
        },
      });
    } else {
      subscriber = await this.prisma.newsletterSubscriber.create({
        data: {
          email: normalizedEmail,
          status: Status.ACTIVE,
          isVerified: true,
          unsubscribeToken,
        },
      });
    }

    // Trigger welcome notification
    try {
      await this.notificationService.queueNotification({
        type: 'EMAIL',
        template: 'users/user-created',
        recipient: normalizedEmail,
        subject: 'Welcome to CoreSlash Newsletter!',
        data: {
          name: normalizedEmail.split('@')[0],
          role: 'SUBSCRIBER',
        },
        eventId: `news_${subscriber.id}`,
      });
    } catch (err) {
      this.logger.warn(`Failed to enqueue welcome email for subscriber: ${err}`);
    }

    return {
      message: 'Successfully subscribed to the CoreSlash newsletter!',
    };
  }

  /**
   * Public unsubscribe.
   */
  async unsubscribe(dto: UnsubscribeNewsletterDto) {
    const normalizedEmail = dto.email.trim().toLowerCase();

    const subscriber = await this.prisma.newsletterSubscriber.findFirst({
      where: { email: normalizedEmail, deletedAt: null },
    });

    if (!subscriber || subscriber.status === Status.INACTIVE) {
      return { message: 'Email is not currently subscribed.' };
    }

    if (dto.token && subscriber.unsubscribeToken && dto.token !== subscriber.unsubscribeToken) {
      throw new BadRequestException('Invalid unsubscribe token');
    }

    await this.prisma.newsletterSubscriber.update({
      where: { id: subscriber.id },
      data: {
        status: Status.INACTIVE,
      },
    });

    return { message: 'Successfully unsubscribed from the newsletter.' };
  }

  /**
   * Admin list subscribers.
   */
  async findAll(query: PaginationQueryDto): Promise<IPaginatedResult<any>> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const sortBy = sanitizeSort(query.sortBy, ['subscribedAt', 'createdAt', 'email', 'status'], 'subscribedAt');
    const search = sanitizeSearch(query.search);

    const where: any = {
      deletedAt: null,
    };

    if (query.status) {
      where.status = query.status as Status;
    }

    if (search) {
      where.email = { contains: search, mode: 'insensitive' };
    }

    const [items, total] = await Promise.all([
      this.prisma.newsletterSubscriber.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: query.sortOrder || 'desc' },
      }),
      this.prisma.newsletterSubscriber.count({ where }),
    ]);

    return buildPaginatedResponse(items, total, page, limit);
  }

  /**
   * Admin soft delete subscriber.
   */
  async remove(id: number, userId?: number) {
    const subscriber = await this.prisma.newsletterSubscriber.findFirst({
      where: { id, deletedAt: null },
    });
    if (!subscriber) {
      throw new NotFoundException(`Subscriber #${id} not found`);
    }

    await this.prisma.newsletterSubscriber.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        status: Status.INACTIVE,
        updatedBy: userId || null,
      },
    });

    if (userId) {
      await this.prisma.activityLog.create({
        data: {
          userId,
          action: 'NEWSLETTER_DELETE',
          module: 'NEWSLETTER',
          recordId: id,
          description: `Soft deleted newsletter subscriber #${id} (${subscriber.email})`,
          status: ActivityStatus.SUCCESS,
        },
      });
    }

    return { message: `Subscriber #${id} deleted successfully` };
  }
}
