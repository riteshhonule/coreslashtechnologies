import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Param, 
  Patch, 
  Query, 
  UseGuards, 
  UseInterceptors, 
  UploadedFile, 
  BadRequestException 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateStatusDto } from './dto/update-candidate-status.dto';
import { CandidatesService } from './candidates.service';
import { AdminAuthGuard } from '../contacts/admin-auth.guard';

const multerConfig = {
  storage: diskStorage({
    destination: './uploads/resumes',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `resume-${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const ext = extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new BadRequestException('Only PDF, DOC, and DOCX resume files are allowed.'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
};

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('resume', multerConfig))
  async create(
    @Body() dto: CreateCandidateDto,
    @UploadedFile() file: any,
  ) {
    if (!file) {
      throw new BadRequestException('Resume upload is mandatory.');
    }
    // Store relative URL path
    const resumeUrl = `/uploads/resumes/${file.filename}`;
    return this.candidatesService.create(dto, resumeUrl);
  }

  @UseGuards(AdminAuthGuard)
  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('position') position?: string,
    @Query('experience') experience?: string,
    @Query('qualification') qualification?: string,
    @Query('status') status?: string,
  ) {
    return this.candidatesService.findAll({
      search,
      position,
      experience,
      qualification,
      status,
    });
  }

  @UseGuards(AdminAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.candidatesService.findOne(id);
  }

  @UseGuards(AdminAuthGuard)
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateCandidateStatusDto,
  ) {
    return this.candidatesService.updateStatus(id, dto.status);
  }
}
