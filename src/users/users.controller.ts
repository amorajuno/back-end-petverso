import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRole } from './enum/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/role.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  //registro
  @Post('new')
  createUser(@Body() data: CreateUserDto): Promise<User> {
    delete data.passwordConfirmation;
    return this.service.create(data, UserRole.USER);
  }

  //new admin
  @Post('create-admin')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  createAdmin(@Body() data: CreateUserDto): Promise<User> {
    delete data.passwordConfirmation;
    return this.service.create(data, UserRole.ADMIN);
  }

  @Get('find/:id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string): Promise<User> {
    return this.service.findOne(id);
  }

  @Get('find/name/:username')
  @UseGuards(AuthGuard())
  findOneByName(@Param('username') username: string): Promise<User> {
    return this.service.findOneByName(username);
  }

  @Get('find-all')
  @UseGuards(AuthGuard())
  findMany() {
    return this.service.findMany();
  }

  @Get('super-find-all')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  findAll() {
    return this.service.findAll();
  }

  @Delete('delete/:id')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  deleteOne(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.deleteOne(id);
  }
}
