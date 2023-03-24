import { Controller, Get, Post } from '@nestjs/common';
import { AuthServices } from '../services/auth.service';

@Controller('/auth')
export class AuthControllers {
  constructor(private authService: AuthServices) {}
  @Post('/login')
  login() {
    return ;
  }
}
