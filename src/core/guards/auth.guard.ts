import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { roleEnum } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';
import Web3Token from 'web3-token';

interface JwtInterface {
  name: string;
  id: number;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    let roles: roleEnum[] = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      roles = [roleEnum.USER, roleEnum.ADMIN, roleEnum.CAMPAIGNER];
    }

    // console.log(roles);

    const request = context.switchToHttp().getRequest();

    const token = request?.headers?.authorization?.split('Bearer ')[1];

    // console.log(token);

    if (!token) {
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
    }

    const { address } = Web3Token.verify(token);

    const user = await this.prismaService.user.findUnique({
      where: {
        address: address.toLowerCase(),
      },
    });

    if (!user) {
      throw new HttpException('not have user', HttpStatus.UNAUTHORIZED);
    }

    // if (!user.isVerified) {
    //   throw new HttpException('user is not verified', HttpStatus.UNAUTHORIZED);
    //   // return false;
    // }

    if (!roles.includes(user.role)) {
      throw new HttpException('not have permission', HttpStatus.UNAUTHORIZED);
      // return false;
    }

    request.user = user;

    return true;
  }
}
