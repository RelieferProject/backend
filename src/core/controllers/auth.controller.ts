import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User, userType } from '../decorators/user.decolator';
import { LoginDto } from '../dtos/auth.dtos';
import { AuthGuard } from '../guards/auth.guard';
import { AuthServices } from '../services/auth.service';

@Controller('/api/auth')
export class AuthControllers {
  constructor(private authService: AuthServices) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body.token);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@User() user: userType) {
    return this.authService.profile(user);
  }
}
