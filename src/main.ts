import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true, // Strips out properties not defined in the DTO
      forbidNonWhitelisted: true, // Throws an error for unknown properties
      transform: true, // Automatically transforms payloads to DTO instances
    }
  ));

  const swagger_config = new DocumentBuilder()
  .setTitle('Test Api Docs')
  .setDescription('Nest Js Api Documentation')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, swagger_config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors()
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
