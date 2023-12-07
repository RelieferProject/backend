import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import Web3Token from 'web3-token';
import { userType } from '../decorators/user.decolator';
import { UserVerifyDto } from '../dtos/user.dtos';

import Web3 from 'web3';
import { Web3Service } from 'src/shared/services/web3.service';
import { EtherJsService } from 'src/shared/services/ether.service';

@Injectable()
export class UserServices {
  constructor(
    private prismaService: PrismaService,
    private web3Service: Web3Service,
    private etherJsService: EtherJsService,
  ) {}

  async requestVerify(user: userType, data: UserVerifyDto) {
    const userFind = await this.prismaService.user.findUnique({
      where: { address: user.address.toLowerCase() },
    });

    const userCheck = await this.prismaService.user.findUnique({
      where: { student_id: data.student_id },
    });

    if (userCheck) {
      throw new HttpException(
        'This student id is already in use',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!userFind) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    try {
      await this.prismaService.user.update({
        where: { address: user.address.toLowerCase() },
        data: {
          name: data.name,
          faculty: data.faculty,
          email: data.email,
          student_id: data.student_id,
          isVerified: false,
          isSendVerify: true,
        },
      });
      return 'Request verify success';
    } catch (error) {
      // console.log(error.message);
      throw new HttpException(
        error.message || 'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async claimFaucet(user: userType) {
    const userFind = await this.prismaService.user.findUnique({
      where: { address: user.address.toLowerCase() },
    });

    if (!userFind) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (userFind.isClaimed) {
      throw new HttpException('user have ETH already', HttpStatus.BAD_REQUEST);
    }

    // console.log(user.address);

    await this.etherJsService.sendEther(user.address, 0.5);

    await this.prismaService.user.update({
      where: { address: user.address.toLowerCase() },
      data: {
        isClaimed: true,
      },
    });

    return `get 0.5 ETH success!`;
  }

  list() {
    return this.prismaService.user.findMany();
  }

  async findByAddress(address: string) {
    const userFind = await this.prismaService.user.findUnique({
      where: { address: address.toLowerCase() },
    });

    if (!userFind) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return userFind;
  }

  async validate(address: string) {
    const userFind = await this.prismaService.user.findUnique({
      where: { address: address.toLowerCase() },
    });

    if (!userFind) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.user.update({
      where: {
        address: address.toLowerCase(),
      },
      data: {
        isVerified: true,
      },
    });

    console.log(address);

    return 'validate success';
  }
}
