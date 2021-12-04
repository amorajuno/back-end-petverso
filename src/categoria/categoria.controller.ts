import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Categoria } from '.prisma/client';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private categoriaService: CategoriaService) {}

  @Post('cadastrar')
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
  remove(@Param('id') id: number) {
    return this.categoriaService.remove(id);
  }
}
