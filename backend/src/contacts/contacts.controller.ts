import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ConfigService } from '@nestjs/config';
import { AdminAuthGuard } from './admin-auth.guard';

@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly service: ContactsService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  create(@Body() body: CreateContactDto) {
    return this.service.create(body);
  }

  @Post('login')
  login(@Body() body: any) {
    const username =
      this.configService.get<string>('SUPERADMIN_USERNAME') || 'admin';
    const password =
      this.configService.get<string>('SUPERADMIN_PASSWORD') || 'admin123';
    const token =
      this.configService.get<string>('SUPERADMIN_TOKEN') ||
      'superadmin-session-token';

    if (body.username === username && body.password === password) {
      return { token };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  findAll() {
    return this.service.findAll();
  }
}
