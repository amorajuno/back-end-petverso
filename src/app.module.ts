import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoriaModule } from './categoria/categoria.module';
import { EmpresaModule } from './empresa/empresa.module';
import { ProdutoModule } from './produto/produto.module';
@Module({
  imports: [UsersModule, EmpresaModule, CategoriaModule, ProdutoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
