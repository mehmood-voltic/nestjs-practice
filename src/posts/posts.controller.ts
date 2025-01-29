import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto';
import { AuthRequest } from 'src/global/interfaces';
import { PassportJwtGuard } from 'src/auth/guards/jwt.guards';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get()
    @UseGuards(PassportJwtGuard)
    getPosts(@Req() req:AuthRequest) {
        return this.postsService.getPosts(req.user.id);
    }

    @Post()
    @UseGuards(PassportJwtGuard)
    createPost(@Req() req:AuthRequest, @Body() dto: CreatePostDto) {
        return this.postsService.createPost(dto, req.user.id);
    }
}
