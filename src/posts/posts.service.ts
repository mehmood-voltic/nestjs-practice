import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePostDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async getPosts(authorId: string) {
    try {
      const posts = await this.prisma.post.findMany({
        where: {
          authorId,
        },
        omit: {
          authorId: true,
        },
      });
      //   console.log(posts);
      if (!posts) {
        throw new NotFoundException("No posts found for this author");
      }
      return posts;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException("Failed to get post");
    }
  }

  async createPost(dto: CreatePostDto, authorId: string) {
    try {
      const newPost = await this.prisma.post.create({
        data: {
          title: dto.title,
          content: dto.content,
          author: {
            connect: {
              id: authorId,
            },
          },
        },
      });

      return newPost;
    } catch (error) {
      throw new InternalServerErrorException("Failed to create post");
    }
  }
}
