import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as session from "express-session";
import * as passport from "passport";
import { CipherKey } from "crypto";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //this global validation pipe prevents to use new validation instance with each dto
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips out properties not defined in the DTO
      forbidNonWhitelisted: true, // Throws an error for unknown properties
      transform: true, // Automatically transforms payloads to DTO instances
    }),
  );

  const swagger_config = new DocumentBuilder()
    .setTitle("Test Api Docs")
    .setDescription("Nest Js Api Documentation")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swagger_config);
  SwaggerModule.setup("api/docs", app, document);

  app.enableCors();

  //enable session authication using express session
  app.use(
    session({
      secret: process.env.SESSION_SECRET as CipherKey,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NEST_ENV === "production",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      },
    }),
  );

  //now initialize passport and call its session method to enable it to use sessions
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
