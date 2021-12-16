import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, AuthResponse } from './dto/login.dto';
import AuthUser from './auth-user.decorator';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { AuthResponseEm, LoginDtoEm } from './dto/login-company.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  login(@Body() data: LoginDto): Promise<AuthResponse> {
    return this.service.login(data);
  }

  @Post('login-company')
  loginCom(@Body() data: LoginDtoEm): Promise<AuthResponseEm> {
    return this.service.loginCom(data);
  }

  @Get('me')
  @UseGuards(AuthGuard())
  me(@AuthUser() user: User): User {
    return user;
  }
}
