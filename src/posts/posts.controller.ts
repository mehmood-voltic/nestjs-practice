import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get(':id')
    getPost(@Param('id') id: string) {
        return this.postsService.getPost(id);
    }

    @Post()
    createPost(@Body() dto: CreatePostDto) {
        return this.postsService.createPost(dto);
    }
}
