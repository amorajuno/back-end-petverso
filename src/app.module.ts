import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoriaModule } from './categoria/categoria.module';
import { EmpresaModule } from './empresa/empresa.module';
import { ProdutoModule } from './produto/produto.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    UsersModule,
    EmpresaModule,
    CategoriaModule,
    ProdutoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
