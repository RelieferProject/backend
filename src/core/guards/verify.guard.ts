import { SetMetadata } from '@nestjs/common';

import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/shared/services/prisma.service';

export const isVerified = (...verify: boolean[]) =>
  SetMetadata('verify', verify);

@Injectable()
export class VerifyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    let verify: boolean[] = this.reflector.getAllAndOverride('verify', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!verify) {
      verify = [true, false];
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!verify.includes(user.isVerified)) {
      throw new HttpException('not have permission', HttpStatus.UNAUTHORIZED);
      // return false;
    }

    return true;
  }
}
