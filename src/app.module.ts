import { Module } from "@nestjs/common";
import { AuthController } from "./auth/controllers/auth.controller";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import { OpenaiModule } from "./openai/openai.module";

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, PostsModule, OpenaiModule],
})
export class AppModule {}
