import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

interface AuthDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: AuthDto) {
    try {
      return await this.authService.register(body.email, body.password);
    } catch (error) {
      if (error instanceof Error && error.message === 'Email already in use') {
        throw new BadRequestException('Email already in use');
      }
      throw error;
    }
  }

  @Post('login')
  async login(@Body() body: AuthDto) {
    try {
      return await this.authService.login(body.email, body.password);
    } catch (error) {
      if (error instanceof Error && error.message === 'Invalid credentials') {
        throw new BadRequestException('Invalid credentials');
      }
      throw error;
    }
  }
}
