import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto";
import { AuthRequest } from "src/global/interfaces";
import { PassportJwtGuard } from "src/auth/guards/jwt.guard";
import { SessionAuthGuard } from "src/auth/guards/session.guard";

@Controller("posts")
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  //   @UseGuards(PassportJwtGuard)
  getPosts(@Req() req: AuthRequest) {
    return this.postsService.getPosts(req.user.id);
  }

  @Post()
  @UseGuards(SessionAuthGuard)
  createPost(@Req() req: AuthRequest, @Body() dto: CreatePostDto) {
    console.log(req.user);
    return this.postsService.createPost(dto, req.user.id);
  }
}
