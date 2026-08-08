import {
  PipeTransform,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { UPLOAD_CONSTANTS } from '@core/constants/upload.constants';
import * as path from 'path';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(
    private readonly maxSize: number = UPLOAD_CONSTANTS.MAX_FILE_SIZE,
    private readonly allowedExtensions: string[] = UPLOAD_CONSTANTS.ALLOWED_EXTENSIONS,
  ) {}

  transform(file: any): any {
    if (!file) {
      throw new BadRequestException('File upload is required');
    }

    if (file.size > this.maxSize) {
      const maxMb = (this.maxSize / (1024 * 1024)).toFixed(1);
      throw new BadRequestException(
        `File size exceeds maximum limit of ${maxMb} MB`,
      );
    }

    const originalname = file.originalname || '';
    const fileExtension = path.extname(originalname).toLowerCase();
    if (!this.allowedExtensions.includes(fileExtension)) {
      throw new BadRequestException(
        `Unsupported file extension (${fileExtension}). Allowed extensions: ${this.allowedExtensions.join(
          ', ',
        )}`,
      );
    }

    return file;
  }
}
