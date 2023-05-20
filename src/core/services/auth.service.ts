import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import Web3Token from 'web3-token';
import { userType } from '../decorators/user.decolator';

@Injectable()
export class AuthServices {
  constructor(private prismaService: PrismaService) {}

  async login(token: string) {
    const { address, body } = Web3Token.verify(token);

    if (!address || !body) {
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        address: address.toLowerCase(),
      },
    });

    const result = {
      address: address.toLowerCase(),
      first: false,
    };

    if (!user) {
      // create user
      await this.prismaService.user.create({
        data: {
          address: address.toLowerCase(),
        },
      });
      result.first = true;
    }

    return result;
  }

  async profile(user: userType) {
    return this.prismaService.user.findUnique({
      where: { address: user.address.toLowerCase() },
    });
  }
}
