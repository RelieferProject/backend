import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
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

    const request = context.switchToHttp().getRequest();

    const token = request?.headers?.authorization?.split('Bearer ')[1];

    if (!token) {
      return false;
    }

    const { address } = Web3Token.verify(token);

    const user = await this.prismaService.user.findUnique({
      where: {
        address: address.toLowerCase(),
      },
    });

    if (!user) {
      return false;
    }

    if (!user.isVerified) {
      return false;
    }

    if (!roles.includes(user.role)) {
      return false;
    }

    request.user = user;

    return true;
  }
}
