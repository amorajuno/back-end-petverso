import { Injectable } from '@nestjs/common';
import { Cart, User } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
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
        totalPrice: price.mul(qnt),
      },
      update: {
        productQnty: data.productQnty,
        totalPrice: price.mul(qnt),
      },
      where: { productID: data.productID },
    });
    return { ...cart, ...productCart };
  }

  async findOne(id: string) {
    return await this.db.cart.findUnique({
      where: { id },
      include: { productList: true },
    });
  }

  async findOneByUser(id: string): Promise<User> {
    let cart = null;
    cart = await this.db.cart.findFirst({
      where: { userID: id, closed: false },
      select: { id: true, productList: true },
    });
    // const products = this.db.productCart.findUnique({
    //   where: { id: cart.productID },
    //   include: { product: true },
    // });
    console.log(cart);
    // console.log(products);
    return cart;
  }

  async updateQnty(id: string, data: UpdateCartDto) {
    const product = await this.db.product.findUnique({
      where: { id: data.productID },
      select: { price: true },
    });
    const qnt = data.productQnty;

    const price = product.price;
    const cartUpdate = await this.db.productCart.update({
      where: { id },
      data: {
        productQnty: data.productQnty,
        totalPrice: price.mul(qnt),
      },
    });
    return { ...cartUpdate };
  }

  async clearCart(cartID: string) {
    return await this.db.productCart.deleteMany({
      where: { id: cartID },
    });
  }

  async removeFromCart(id: string) {
    return await this.db.productCart.delete({
      where: { id },
    });
  }

  // async updateStorage(id: string) {
  //   return await this.db. list.map((productCart) => {
  //     // for (product in productCart) {
  //       this.db.product.updateMany({
  //         where: { id: productCart.productID },
  //         data: {
  //           quantity: { decrement: productCart.productQnty },
  //         },
  //       });
  //     }
  //   );
  // }

  async closeCart(id: string): Promise<Cart> {
    const cart = await this.findOne(id);
    // const products = cart.productList.map(id)
    const list = cart.productList;
    const productToBuy = list.map((product) => product.totalPrice);

    const sum = productToBuy.reduce((a, b) => b.add(a), new Decimal(0));

    console.log(sum);

    return this.db.cart.update({
      where: { id },
      data: {
        closed: true,
      },
    });
  }
}

//   return await

// db.cart.findUnique({
//   where: { id },
//   include: { productList: true },
// });
// const products = this.findOneproductList.findMany();
