import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { Web3Service } from './services/web3.service';
import { EtherJsService } from './services/ether.service';
import { CloudinaryService } from './services/cloudinary.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, Web3Service, EtherJsService, CloudinaryService],
  exports: [PrismaService, Web3Service, EtherJsService, CloudinaryService],
})
export class ShareModule {}
