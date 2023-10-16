import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { VerifyGuard, isVerified } from '../guards/verify.guard';
import { UserServices } from '../services/user.service';
import { User, userType } from '../decorators/user.decolator';
import { UserVerifyDto } from '../dtos/user.dtos';
import { Roles } from 'src/shared/decorators/role.decorator';

@Controller('/api/user')
export class UserControllers {
  constructor(private userServices: UserServices) {}

  // @Roles('USER', 'ADMIN')
  @UseGuards(AuthGuard, VerifyGuard)
  @isVerified(false)
  @Post('verify')
  verify(@User() user: userType, @Body() data: UserVerifyDto) {
    return this.userServices.requestVerify(user, data);
  }

  @UseGuards(AuthGuard, VerifyGuard)
  @isVerified(false)
  @Post('claim')
  claim(@User() user: userType) {
    return this.userServices.claimFaucet(user);
  }

  @UseGuards(AuthGuard, VerifyGuard)
  @Roles('ADMIN')
  @Get('list')
  list(@User() user: userType) {
    return this.userServices.list();
  }

  @UseGuards(AuthGuard, VerifyGuard)
  @Roles('ADMIN')
  @Post('validate')
  validation(@User() user: userType, @Body() data: { address: string }) {
    return this.userServices.validate(data.address);
  }
}
