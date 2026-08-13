import { Controller, Post, Body, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post('apply')
  @UseInterceptors(
    FileInterceptor('resume', {
      storage: diskStorage({
        destination: './uploads/resumes',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
          return cb(new BadRequestException('Only PDF and Word documents are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async apply(
    @Body() createJobApplicationDto: CreateJobApplicationDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Resume file is required');
    }
    
    // In a real app, this would be a full URL or cloud storage path.
    // Here we're saving the relative local path.
    const resumeUrl = `/uploads/resumes/${file.filename}`;
    return this.jobsService.create(createJobApplicationDto, resumeUrl);
  }
}
