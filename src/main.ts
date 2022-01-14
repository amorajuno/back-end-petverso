import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Petverso server')
    .setDescription('Marketplace de produtos para pets')
    .setVersion('1.0')
    .addTag('pets')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
