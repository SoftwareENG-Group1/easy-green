/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from 'all-exceptions.filter';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  dotenv.config();
  const config = new DocumentBuilder()
  .setTitle('Octo-Prime')
  .setDescription('Loan and Amortization Application')
  .setVersion('v1')
  .addServer('http://localhost:3000', 'Local environment')
  .addTag('Octo-Prime')
  .build(); 
  app.useGlobalFilters(new AllExceptionsFilter());

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);


  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
