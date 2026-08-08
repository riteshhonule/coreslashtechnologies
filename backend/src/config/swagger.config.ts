import { registerAs } from '@nestjs/config';

export default registerAs('swagger', () => ({
  title: process.env.APP_NAME || 'CoreSlash Technologies API',
  description: 'Official Backend API for CoreSlash Technologies Website CMS',
  version: '1.0.0',
  path: 'api/docs',
}));
