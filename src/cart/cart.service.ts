import { Injectable } from '@nestjs/common';
import { Cart } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Product } from 'src/product/entities/produto.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(private db: PrismaService) {}

  async addToCart(data: CreateCartDto): Promise<Cart> {
    let cart = null;
    cart = await this.db.cart.findFirst({
      where: { userID: data.userID, closed: false },
      select: { id: true },
    });

    if (!cart) {
      cart = await this.db.cart.create({
        data: { userID: data.userID, closed: false },
      });
    }
    const product = await this.db.product.findUnique({
      where: { id: data.productID },
      select: { price: true },
    });
    const productCart = await this.db.productCart.upsert({
      create: {
        productID: data.productID,
        cartId: cart.id,
        productQnty: data.productQnty,
        totalPrice: product.price,
      },
      update: {
        productQnty: data.productQnty,
        totalPrice: product.price,
      },
      where: { productID: data.productID },
    });

    // testando o uso de upsert para não precisar
    // pesquisar a existencia do produto no carrinho
    // const previousAdded = await this.db.productCart.findFirst({
    //   where: { productID: data.productID },
    //   select: { productQnty: true, totalPrice: true },
    // });
    // if (previousAdded) {
    //   this.db.productCart.upsert;
    // }
    return { ...cart, ...productCart };

    // const product = await this.db.product.findUnique({ where: { id } });
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
