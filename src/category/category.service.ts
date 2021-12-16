import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Prisma, Category } from '.prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private db: PrismaService) {}

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    const category = await this.db.category.create({ data });
    return category;
  }

  async findAll(): Promise<Category[]> {
    const category = await this.db.category.findMany();
    return category;
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.db.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('ID não encontrado');
    }

    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} company`;
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.db.category.delete({ where: { id } });

    return { message: `Category com ID: ${id} deletada com sucesso.` };
  }
}
