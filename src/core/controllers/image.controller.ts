import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../guards/auth.guard';
import { VerifyGuard } from '../guards/verify.guard';
import { CloudinaryService } from 'src/shared/services/cloudinary.service';
import { ImageServices } from '../services/image.service';

@Controller('api/image')
export class ImageControllers {
  constructor(private imageServices: ImageServices) {}

  @Post('upload')
  @UseGuards(AuthGuard, VerifyGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    return this.imageServices.uploadImage(file.buffer);
  }
}
