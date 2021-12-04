import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Prisma, Categoria } from '.prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoriaService {
  constructor(private db: PrismaService) {}

  async create(data: Prisma.CategoriaCreateInput): Promise<Categoria> {
    const categoria = await this.db.categoria.create({ data });
    return categoria;
  }

  async findAll(): Promise<Categoria[]> {
    const categoria = await this.db.categoria.findMany();
    return categoria;
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.db.categoria.findUnique({
      where: { id },
    });

    if (!categoria) {
      throw new NotFoundException('ID não encontrado');
    }

    return categoria;
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} empresa`;
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.db.categoria.delete({ where: { id } });

    return { message: `Categoria com ID: ${id} deletada com sucesso.` };
  }
}
