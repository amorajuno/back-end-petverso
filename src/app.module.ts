import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { CompanyModule } from './company/company.module';
import { ProductModule } from './product/product.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    UsersModule,
    CompanyModule,
    CategoryModule,
    ProductModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
