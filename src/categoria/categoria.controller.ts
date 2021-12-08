import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Categoria } from '.prisma/client';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { Role } from 'src/auth/role/role.decorator';
import { UserRole } from 'src/users/enum/role.enum';

@Controller('categoria')
export class CategoriaController {
  constructor(private categoriaService: CategoriaService) {}

  @Post('cadastrar')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  create(@Body() data: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriaService.create(data);
  }

  @Get('todas')
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoriaService.findOne(+id);
  }

  @Delete(':id')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  remove(@Param('id') id: number) {
    return this.categoriaService.remove(id);
  }
}
