import { Injectable, NotFoundException } from '@nestjs/common';
import { Produto, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(private db: PrismaService) {}

  async create(data: Prisma.ProdutoCreateInput): Promise<Produto> {
    const produto = await this.db.produto.create({ data });
    return produto;
  }

  //

  async findAll(): Promise<Produto[]> {
    const produtos = await this.db.produto.findMany();
    return produtos;
  }

  async findOne(id: string): Promise<Produto> {
    const produto = await this.db.produto.findUnique({
      where: { id },
    });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado, cheque o ID.');
    }

    return produto;
  }

  update(id: string, updateProdutoDto: UpdateProdutoDto) {
    return `This action updates a #${id} produto`;
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.db.produto.delete({ where: { id } });

    return { message: `Produto com id#${id} removido do catálogo` };
  }
}
