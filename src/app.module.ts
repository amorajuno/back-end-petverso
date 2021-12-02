import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProdutoModule } from './produto/produto.module';
import { CategoriaModule } from './categoria/categoria.module';
import { EmpresaModule } from './empresa/empresa.module';
import { ProdutoModule } from './produto/produto.module';
@Module({
  imports: [UsersModule, ProdutoModule, EmpresaModule, CategoriaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
