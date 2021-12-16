import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
