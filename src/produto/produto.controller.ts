import { Produto } from '@prisma/client';
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
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { UserRole } from 'src/users/enum/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role/role.decorator';
import { RolesGuard } from 'src/auth/role/roles.guard';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post('cadastrar')
  @Role(UserRole.USER_COM)
  @UseGuards(AuthGuard(), RolesGuard)
  create(@Body() data: CreateProdutoDto): Promise<Produto> {
    return this.produtoService.create(data);
  }

  @Get('todos')
  findAll() {
    return this.produtoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(+id, updateProdutoDto);
  }

  @Delete('apagar/:id')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  remove(@Param('id') id: string) {
    return this.produtoService.remove(+id);
  }
}
