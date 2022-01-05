import { Injectable } from '@nestjs/common';
import { Cart } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(private db: PrismaService) {}

  async create(data: CreateCartDto): Promise<Cart> {
    const cart = await this.db.cart.create({ data });
    return cart;
  }

  async addToCart(data: UpdateCartDto, id: number): Promise<Cart> {
    let cart = await this.db.cart.update({ where: { id }, data: data });
    
    return cart;
  }

  findAll() {
    return this.db.cart.findMany;
  }

  findOne(id: number) {
    return this.db.cart.findUnique({ where: { id } });
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return this.db.cart.update({ where: { id }, data: updateCartDto });
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
