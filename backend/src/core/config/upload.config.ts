import { registerAs } from '@nestjs/config';
import { UPLOAD_CONSTANTS } from '../constants/upload.constants';

export default registerAs('upload', () => ({
  destination: process.env.UPLOAD_DESTINATION || 'storage/uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10),
  allowedMimeTypes: UPLOAD_CONSTANTS.ALLOWED_MIME_TYPES,
  allowedExtensions: UPLOAD_CONSTANTS.ALLOWED_EXTENSIONS,
  folders: UPLOAD_CONSTANTS.UPLOAD_FOLDERS,
}));
