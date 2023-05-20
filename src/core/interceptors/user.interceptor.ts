import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  NestInterceptor,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import Web3Token from 'web3-token';

export class UserInterceptor implements NestInterceptor {
  constructor(private prismaService: PrismaService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();

    const token = request?.address;

    if (!token) {
      return next.handle();
    }

    const { address, body } = Web3Token.verify(token);

    if (!address || !body) {
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        address: address.toLowerCase(),
      },
    });

    if (!user) {
      throw new HttpException('Not Register', HttpStatus.UNAUTHORIZED);
    }

    if (!user.isVerified) {
      throw new HttpException('Not Verify', HttpStatus.UNAUTHORIZED);
    }

    request.user = user;
    return next.handle();
  }
}
