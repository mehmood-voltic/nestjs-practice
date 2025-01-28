import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true, // Strips out properties not defined in the DTO
      forbidNonWhitelisted: true, // Throws an error for unknown properties
      transform: true, // Automatically transforms payloads to DTO instances
    }
  ));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
