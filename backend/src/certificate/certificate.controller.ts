import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { CertificateService } from './certificate.service';

@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Get(':certificateId')
  async getCertificate(@Param('certificateId') certificateId: string) {
    const certificate = await this.certificateService.findByCertificateId(certificateId);

    if (!certificate) {
      throw new NotFoundException({
        success: false,
        message: 'Certificate not found.',
      });
    }

    return {
      success: true,
      data: {
        certificateId: certificate.certificateId,
        studentName: certificate.studentName,
        courseName: certificate.courseName,
        issueDate: certificate.issueDate,
        status: certificate.status,
      },
    };
  }
}
