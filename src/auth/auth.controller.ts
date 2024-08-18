import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }): Promise<User> {
    const { email, password } = body;

    if (!password || password.trim() === '') {
      throw new HttpException('Password cannot be empty', HttpStatus.BAD_REQUEST);
    }

    if (!email || email.trim() === '') {
      throw new HttpException('Email cannot be empty', HttpStatus.BAD_REQUEST);
    }

    return this.authService.register(email, password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<{ accessToken: string }> {
    const { email, password } = body;

    if (!password || password.trim() === '') {
      throw new HttpException('Password cannot be empty', HttpStatus.BAD_REQUEST);
    }

    if (!email || email.trim() === '') {
      throw new HttpException('Email cannot be empty', HttpStatus.BAD_REQUEST);
    }

    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return this.authService.login(user);
  }
}
