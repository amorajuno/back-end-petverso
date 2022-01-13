import { Product } from '@prisma/client';
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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role/role.decorator';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { UserRole } from 'src/users/enum/role.enum';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Role(UserRole.USER_COM)
  @UseGuards(AuthGuard(), RolesGuard)
  create(@Body() data: CreateProductDto): Promise<Product> {
    return this.productService.create(data);
  }

  @Get('all')
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Get('/cat/:id')
  findByCat(@Param('id') id: number) {
    return this.productService.findByCat(+id);
  }

  @Get('/byname/:searchName')
  findByName(@Param('searchName') searchName: string) {
    return this.productService.findByName(searchName);
  }

  @Patch(':id')
  @Role(UserRole.USER_COM)
  @UseGuards(AuthGuard(), RolesGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete('apagar/:id')
  @Role(UserRole.USER_COM)
  @UseGuards(AuthGuard(), RolesGuard)
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
