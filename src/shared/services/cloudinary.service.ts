import {
  HttpException,
  HttpStatus,
  INestApplication,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { v2 as Cloudinary } from 'cloudinary';
import * as path from 'path';
import * as fs from 'fs';

Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_PUBLIC_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

@Injectable()
export class CloudinaryService {
  async uploadFile(blob: Buffer): Promise<any> {
    return new Promise((resolve, reject) => {
      Cloudinary.uploader
        .upload_stream((error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(blob);
    });
  }

  async deleteFile(publicId: string) {
    await Cloudinary.uploader.destroy(publicId);
  }

  private removeTempFile(filePath: string) {
    fs.unlinkSync(filePath);
  }
}
