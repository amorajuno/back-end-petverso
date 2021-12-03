import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';

@Module({
  imports: [PrismaService],
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class ProdutoModule {}
