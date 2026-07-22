import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CertificateService {
  constructor(private readonly prisma: PrismaService) {}

  async findByCertificateNumber(certificateNumber: string) {
    return this.prisma.certificate.findUnique({
      where: {
        certificateNumber,
      },
    });
  }

  async findAll(search?: string, status?: any) {
    const where: any = {};

    if (status && status !== 'All') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { certificateNumber: { contains: search, mode: 'insensitive' } },
        { candidateName: { contains: search, mode: 'insensitive' } },
        { courseName: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.certificate.findMany({
      where,
      orderBy: {
        issueDate: 'desc',
      },
    });
  }

  async create(data: any) {
    return this.prisma.certificate.create({
      data: {
        certificateNumber: data.certificateNumber.trim().toUpperCase(),
        candidateName: data.candidateName.trim(),
        courseName: data.courseName.trim(),
        issueDate: new Date(data.issueDate),
        completionDate: data.completionDate ? new Date(data.completionDate) : null,
        grade: data.grade ? data.grade.trim() : null,
        status: data.status || 'Verified',
        certificateUrl: data.certificateUrl ? data.certificateUrl.trim() : null,
      },
    });
  }

  async update(id: string, data: any) {
    const updateData: any = {};
    if (data.certificateNumber !== undefined) updateData.certificateNumber = data.certificateNumber.trim().toUpperCase();
    if (data.candidateName !== undefined) updateData.candidateName = data.candidateName.trim();
    if (data.courseName !== undefined) updateData.courseName = data.courseName.trim();
    if (data.issueDate !== undefined) updateData.issueDate = new Date(data.issueDate);
    if (data.completionDate !== undefined) {
      updateData.completionDate = data.completionDate ? new Date(data.completionDate) : null;
    }
    if (data.grade !== undefined) updateData.grade = data.grade ? data.grade.trim() : null;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.certificateUrl !== undefined) {
      updateData.certificateUrl = data.certificateUrl ? data.certificateUrl.trim() : null;
    }

    return this.prisma.certificate.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string) {
    return this.prisma.certificate.delete({
      where: { id },
    });
  }

  async getNextNumber() {
    const currentYear = new Date().getFullYear();
    const prefix = `CS-${currentYear}-`;

    const certificates = await this.prisma.certificate.findMany({
      where: {
        certificateNumber: {
          contains: String(currentYear),
        },
      },
      select: {
        certificateNumber: true,
      },
    });

    let maxSeq = 0;
    for (const cert of certificates) {
      const parts = cert.certificateNumber.split('-');
      const lastPart = parts[parts.length - 1];
      const seq = parseInt(lastPart, 10);
      if (!isNaN(seq) && seq > maxSeq) {
        maxSeq = seq;
      }
    }

    const nextSeq = maxSeq + 1;
    const formattedSeq = String(nextSeq).padStart(4, '0');
    return {
      nextNumber: `${prefix}${formattedSeq}`,
    };
  }
}
