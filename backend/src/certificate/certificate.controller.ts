import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  HttpCode,
  HttpStatus,
  Logger,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CertificateService } from './certificate.service';
import { VerifyCertificateDto } from './dto/verify-certificate.dto';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { AdminAuthGuard } from '../contacts/admin-auth.guard';

const multerConfig = {
  storage: diskStorage({
    destination: './uploads/certificates',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `certificate-${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.pdf'];
    const ext = extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new BadRequestException('Only PDF certificate files are allowed.'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
};

@Controller('certificate')
export class CertificateController {
  private readonly logger = new Logger(CertificateController.name);

  constructor(private readonly certificateService: CertificateService) {}

  @Get()
  @UseGuards(AdminAuthGuard)
  async findAll(
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    return this.certificateService.findAll(search, status);
  }

  @Get('next-number')
  @UseGuards(AdminAuthGuard)
  async getNextCertificateNumber() {
    return this.certificateService.getNextNumber();
  }

  @Post()
  @UseGuards(AdminAuthGuard)
  async create(@Body() createCertificateDto: CreateCertificateDto) {
    try {
      const existing = await this.certificateService.findByCertificateNumber(
        createCertificateDto.certificateNumber.trim().toUpperCase(),
      );
      if (existing) {
        throw new BadRequestException('Certificate number already exists.');
      }
      return this.certificateService.create(createCertificateDto);
    } catch (e) {
      if (e instanceof BadRequestException) throw e;
      this.logger.error(`Error creating certificate: ${e.message}`, e.stack);
      throw new InternalServerErrorException('Failed to create certificate.');
    }
  }

  @Post('upload')
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadCertificatePdf(@UploadedFile() file: any) {
    if (!file) {
      throw new BadRequestException('Certificate file upload is mandatory.');
    }
    return {
      url: `/uploads/certificates/${file.filename}`,
    };
  }

  @Patch(':id')
  @UseGuards(AdminAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateCertificateDto: UpdateCertificateDto,
  ) {
    try {
      if (updateCertificateDto.certificateNumber) {
        const existing = await this.certificateService.findByCertificateNumber(
          updateCertificateDto.certificateNumber.trim().toUpperCase(),
        );
        if (existing && existing.id !== id) {
          throw new BadRequestException('Certificate number already exists.');
        }
      }
      return this.certificateService.update(id, updateCertificateDto);
    } catch (e) {
      if (e instanceof BadRequestException) throw e;
      this.logger.error(`Error updating certificate: ${e.message}`, e.stack);
      throw new InternalServerErrorException('Failed to update certificate.');
    }
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  async remove(@Param('id') id: string) {
    try {
      return this.certificateService.delete(id);
    } catch (e) {
      this.logger.error(`Error deleting certificate: ${e.message}`, e.stack);
      throw new InternalServerErrorException('Failed to delete certificate.');
    }
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verifyCertificate(@Body() verifyCertificateDto: VerifyCertificateDto) {
    try {
      const { certificateNumber } = verifyCertificateDto;

      const certificate = await this.certificateService.findByCertificateNumber(certificateNumber);

      if (!certificate) {
        return {
          success: false,
          message: 'Certificate Not Found',
        };
      }

      return {
        success: true,
        message: 'Certificate Verified',
        data: {
          certificateNumber: certificate.certificateNumber,
          candidateName: certificate.candidateName,
          courseName: certificate.courseName,
          issueDate: certificate.issueDate,
          completionDate: certificate.completionDate,
          grade: certificate.grade,
          status: certificate.status,
          certificateUrl: certificate.certificateUrl,
        },
      };
    } catch (error) {
      this.logger.error(`Error verifying certificate: ${error.message}`, error.stack);
      return {
        success: false,
        message: 'An error occurred during certificate verification.',
      };
    }
  }

  @Get(':certificateNumber')
  async getCertificate(@Param('certificateNumber') certificateNumber: string) {
    const certificate = await this.certificateService.findByCertificateNumber(certificateNumber);

    if (!certificate) {
      throw new NotFoundException({
        success: false,
        message: 'Certificate not found.',
      });
    }

    return {
      success: true,
      data: {
        certificateNumber: certificate.certificateNumber,
        candidateName: certificate.candidateName,
        courseName: certificate.courseName,
        issueDate: certificate.issueDate,
        completionDate: certificate.completionDate,
        grade: certificate.grade,
        status: certificate.status,
        certificateUrl: certificate.certificateUrl,
      },
    };
  }
}
