import { Product } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
  constructor(private db: PrismaService) {}

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    const product = await this.db.product.create({ data });
    return product;
  }

  findAll() {
    return this.db.product.findMany();
  }

  findOne(id: string) {
    return this.db.product.findUnique({ where: { id } });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
