import { Controller, Post, Body } from '@nestjs/common';
import { PartnershipsService } from './partnerships.service';
import { CreatePartnershipDto } from './dto/create-partnership.dto';

@Controller('partnerships')
export class PartnershipsController {
  constructor(private readonly partnershipsService: PartnershipsService) {}

  @Post()
  create(@Body() createPartnershipDto: CreatePartnershipDto) {
    return this.partnershipsService.create(createPartnershipDto);
  }
}
