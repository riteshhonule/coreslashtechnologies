import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CertificateService {
  constructor(private readonly prisma: PrismaService) {}

  async findByCertificateId(certificateId: string) {
    return this.prisma.certificate.findUnique({
      where: {
        certificateId,
      },
    });
  }
}
