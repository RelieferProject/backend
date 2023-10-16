import { HttpException, Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/shared/services/cloudinary.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { CreateCampaignDto } from '../dtos/campaign.dtos';

@Injectable()
export class CampaignServices {
  constructor(
    private prismaService: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(dto: CreateCampaignDto) {
    console.log(dto);
    const campaign = await this.prismaService.campaign.create({
      data: {
        address: dto.address,
        name: dto.name,
        description: dto.description,
        rewardTokenAmount: dto.rewardTokenAmount,
        startTime: dto.startTime,
        endTime: dto.endTime,
        durationToEarn: dto.durationToEarn,
      },
    });

    for (const image of dto.picture) {
      try {
        await this.prismaService.picture.create({
          data: {
            campaign: {
              connect: {
                id: campaign.id,
              },
            },
            url: image.url,
            name: image.public_id,
          },
        });
      } catch (e) {
        throw new HttpException(e.message, 400);
      }
    }

    return 'Create campaign success';
  }

  async getByAddress(address: string) {
    // console.log(address);
    return await this.prismaService.campaign.findFirst({
      where: {
        address: address,
      },
      include: {
        picture: true,
      },
    });
  }

  async list() {
    return await this.prismaService.campaign.findMany({
      include: {
        picture: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
