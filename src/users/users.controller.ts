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
import { RolesGuard } from 'src/auth/role/roles.guard';
import { Role } from 'src/auth/role/role.decorator';

@Controller('user')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  //registro
  @Post('registrar')
  createUser(@Body() data: CreateUserDto): Promise<User> {
    delete data.passwordConfirmation;
    return this.service.create(data, UserRole.USER);
  }

  //new admin create aberto
  @Post('registrar-admin')
  // @Role(UserRole.ADMIN)
  // @UseGuards(AuthGuard(), RolesGuard)
  createAdmin(@Body() data: CreateUserDto): Promise<User> {
    delete data.passwordConfirmation;
    return this.service.create(data, UserRole.ADMIN);
  }

  @Get('buscar/:id')
  @Role(UserRole.USER)
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string): Promise<User> {
    return this.service.findOne(id);
  }

  @Get('buscar/name/:username')
  @UseGuards(AuthGuard())
  findOneByName(@Param('username') username: string): Promise<User> {
    return this.service.findOneByName(username);
  }

  @Get('buscar-todos')
  @UseGuards(AuthGuard())
  findMany() {
    return this.service.findMany();
  }
  // unica rota que mostra todas as informações de todos os usuários.\/\/\/\/\/
  @Get('super-find-all')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  findAll() {
    return this.service.findAll();
  }

  // @Patch(':id')
  // @Role(UserRole.USER)
  // @UseGuards(AuthGuard(), RolesGuard)
  // updateOne(@Param('id') id: string): {
  //   return this.service.updateOne(id);
  // }

  @Delete('deletar/:id')
  @Role(UserRole.USER)
  @UseGuards(AuthGuard(), RolesGuard)
  deleteOne(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.deleteOne(id);
  }
}
