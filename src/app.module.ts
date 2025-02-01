import { Module } from "@nestjs/common";
import { AuthController } from "./auth/controllers/auth.controller";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import { OpenaiModule } from "./openai/openai.module";
import { RedisModule } from "@nestjs-modules/ioredis";

@Module({
  imports: [
    AuthModule,
    RedisModule.forRoot({
      type: "single",
      url: "redis://localhost:6379",
    }),
    PrismaModule,
    UsersModule,
    PostsModule,
    OpenaiModule,
    RedisModule,
  ],
})
export class AppModule {}
