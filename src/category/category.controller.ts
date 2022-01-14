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
import { Category } from '.prisma/client';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { Role } from 'src/auth/role/role.decorator';
import { UserRole } from 'src/users/enum/role.enum';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('cadastrar')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  create(@Body() data: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(data);
  }

  @Get('todas')
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(+id);
  }

  @Delete('apagar/:id')
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  remove(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}
