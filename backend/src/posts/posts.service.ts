import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Post } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPostDto: Prisma.PostCreateInput): Promise<Post> {
    try {
      const createdPost = await this.prismaService.post.create({
        data: {
          author: createPostDto.author,
          title: createPostDto.title,
          content: createPostDto.content,
        },
      });
      return createdPost;
    } catch (error) {
      throw new HttpException(
        'Failed to create the post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllPost(params: { skip?: number; take?: number }): Promise<Post[]> {
    try {
      const { skip, take } = params;
      const posts = await this.prismaService.post.findMany({
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      });

      if (!posts) {
        throw new HttpException('No posts found', HttpStatus.NOT_FOUND);
      }
      return posts;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch posts',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOnePost(where: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    try {
      const post = await this.prismaService.post.findUnique({ where });

      if (!post) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }

      return post;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch the post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePost(
    where: Prisma.PostWhereUniqueInput,
    updatePostDto: Prisma.PostUpdateInput,
  ): Promise<Post | null> {
    try {
      const post = await this.prismaService.post.update({
        where,
        data: updatePostDto,
      });

      if (!post) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }

      return post;
    } catch (error) {
      throw new HttpException(
        'Failed to update the post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<string> {
    try {
      const post = await this.prismaService.post.delete({ where });

      if (!post) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }
      return 'Post deleted successfully...';
    } catch (error) {
      throw new HttpException(
        'Failed to delete the post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
