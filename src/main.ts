import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Expense Tracker Api')
    .setDescription('The Expense Tracker API helps users track their expenses and income, organized by time periods and categories.')
    .setVersion('1.0')
    .addTag('Expense Tracker')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // enables class-transformer
    whitelist: true, // strips non-decorated fields
  }));
  app.setGlobalPrefix('api');
  /*   app.use(cookieParser());
    app.enableCors({
      origin: '*',
      credentials: true,
    }) */
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
