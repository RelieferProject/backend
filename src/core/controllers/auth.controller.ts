import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto } from '../dtos/auth.dtos';
import { AuthServices } from '../services/auth.service';

@Controller('/auth')
export class AuthControllers {
  constructor(private authService: AuthServices) {}
  @Post('login')
  login(@Body() body: LoginDto) {
    return 'test';
  }
}
