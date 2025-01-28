import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}

    async getPost(id: string) {
        return 'returned posts'
    }

    async createPost(dto:CreatePostDto) {
        return 'created post'
    }
}
