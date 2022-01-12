import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/addtocart')
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.addToCart(createCartDto);
  }

  // @Get()
  // findAll() {
  //   return this.cartService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }
  @Get('/user/:id')
  findOneByUser(@Param('id') id: string) {
    return this.cartService.findOneByUser(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.updateQnty(id, updateCartDto);
  }

  @Patch('close/:id')
  closeCart(@Param('id') id: string) {
    return this.cartService.closeCart(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.removeFromCart(id);
  }

  @Delete('/:cartID/:pID')
  clearCart(@Param('id') pID: string, cartID: string) {
    return this.cartService.clearCart(pID);
  }
}
