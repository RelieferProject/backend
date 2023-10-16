import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CampaignServices } from '../services/campaign.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/shared/decorators/role.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { VerifyGuard } from '../guards/verify.guard';
import { CreateCampaignDto } from '../dtos/campaign.dtos';

@Controller('/api/campaign')
export class CampaignControllers {
  constructor(private campaignServices: CampaignServices) {}

  @Post('create')
  @UseGuards(AuthGuard, VerifyGuard)
  @Roles('ADMIN', 'CAMPAIGNER')
  create(@Body() data: CreateCampaignDto) {
    return this.campaignServices.create(data);
  }

  @Get('list')
  getList() {
    return this.campaignServices.list();
  }

  @Get('/:address')
  getByAddress(@Param() { address }: any) {
    return this.campaignServices.getByAddress(address);
  }
}
