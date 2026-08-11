import { Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AdminAuthService implements OnModuleInit {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async onModuleInit() {
    // Seed default admin if none exists
    const adminCount = await this.prisma.admin.count();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await this.prisma.admin.create({
        data: {
          email: 'admin@coreslash.com',
          password: hashedPassword,
        },
      });
      console.log('✅ Default super admin created: admin@coreslash.com / admin123');
    }
  }

  async login(loginDto: LoginDto) {
    const admin = await this.prisma.admin.findUnique({
      where: { email: loginDto.email },
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: admin.id, email: admin.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: admin.id,
        email: admin.email,
      }
    };
  }
}
