import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [CategoriaController],
  providers: [CategoriaService, PrismaService],
})
export class CategoriaModule {}
