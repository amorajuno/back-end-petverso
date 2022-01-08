import { Injectable } from '@nestjs/common';
import { Cart } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
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
    const qnt = data.productQnty;

    const price = product.price;
    console.log(typeof price, price, typeof qnt, qnt);
    const productCart = await this.db.productCart.upsert({
      create: {
        productID: data.productID,
        cartId: cart.id,
        productQnty: data.productQnty,
        totalPrice: product.price,
      },
      update: {
        productQnty: data.productQnty,
        totalPrice: price.mul(qnt),
      },
      where: { productID: data.productID },
    });
    return { ...cart, ...productCart };
  }

  findOne(id: string) {
    return this.db.cart.findUnique({
      where: { id },
      include: { productList: true },
    });
  }

  async updateQnty(id: string, updateCartDto: UpdateCartDto) {
    return await this.db.productCart.update({
      where: { id },
      data: {
        productQnty: updateCartDto.productQnty,
      },
    });
  }
  async clearCart(cartID: string) {
    return await this.db.productCart.deleteMany({
      where: { id: cartID },
    });
  }

  removeFromCart(id: string) {
    return this.db.productCart.delete({
      where: { id },
    });
  }
}
