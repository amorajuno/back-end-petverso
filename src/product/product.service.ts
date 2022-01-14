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
    console.log(product);
    return product;
  }

  async findAll() {
    return await this.db.product.findMany({ include: { company: true } });
  }

  async findOne(id: string) {
    return await this.db.product.findUnique({
      where: { id },
      include: {
        company: true,
      },
    });
  }

  async findByCat(id: number) {
    return await this.db.category.findMany({
      where: { id },
      include: { products: true },
    });
  }

  async findByName(searchName: string) {
    return await this.db.product.findMany({
      where: {
        name: {
          contains: searchName,
        },
      },
    });
  }
  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.db.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: string) {
    return this.db.product.delete({ where: { id } });
  }
}
