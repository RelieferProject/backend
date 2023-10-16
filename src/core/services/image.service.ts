import { HttpException, Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/shared/services/cloudinary.service';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class ImageServices {
  constructor(
    private prismaService: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async uploadImage(blob: Buffer) {
    try {
      const result = await this.cloudinaryService.uploadFile(blob);

      const url = result.secure_url;
      const public_id = result.public_id;

      return { url, public_id };
    } catch (error) {
      throw new HttpException('Cannot upload to cloudinary', 500);
    }
  }
}
