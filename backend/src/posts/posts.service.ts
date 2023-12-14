import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Post } from '@prisma/client';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateDummyPostDto } from './dto/create-dummy-post.dto';

@Injectable()
export class PostsService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    fileName: string,
    file: Buffer,
  ): Promise<Post> {
    try {
      const existingPost = await this.prismaService.post.findFirst({
        where: { title: createPostDto.title },
      });

      if (existingPost) {
        throw new ConflictException(
          `Post with title ${createPostDto.title} already exist`,
        );
      }
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.configService.getOrThrow('S3_BUCKET_NAME'),
          Key: fileName,
          Body: file,
        }),
      );
      createPostDto.image = `${this.configService.getOrThrow(
        'S3_BASE_URL',
      )}/${fileName}`;
      const postTags: any = createPostDto.tags;
      const createdPost = await this.prismaService.post.create({
        data: {
          author: createPostDto.author,
          title: createPostDto.title,
          content: createPostDto.content,
          image: createPostDto.image,
          tags: Array.isArray(postTags) ? postTags : postTags.split(','),
          published: Boolean(createPostDto.published),
          publicationDate: createPostDto.publicationDate,
        },
      });
      return createdPost;
    } catch (error) {
      console.error('Original error:', error);
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create the post');
    }
  }

  async create2(createPostDto: CreateDummyPostDto): Promise<Post> {
    try {
      const existingPost = await this.prismaService.post.findFirst({
        where: { title: createPostDto.title },
      });

      if (existingPost) {
        throw new ConflictException(
          `Post with title ${createPostDto.title} already exist`,
        );
      }

      const postTags: any = createPostDto.tags;
      const createdPost = await this.prismaService.post.create({
        data: {
          author: createPostDto.author,
          title: createPostDto.title,
          content: createPostDto.content,
          image: 'no image for now',
          tags: Array.isArray(postTags) ? postTags : postTags.split(','),
          published: Boolean(createPostDto.published),
          publicationDate: createPostDto.publicationDate,
        },
      });
      return createdPost;
    } catch (error) {
      console.error('Original error:', error);
      if (error instanceof BadRequestException) {
        throw error;
      } else if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create the post');
    }
  }

  async findAllPost(tag?: string): Promise<Post[]> {
    try {
      let wherePart: { tag?: string } = {};

      if (tag) {
        wherePart.tag = tag;
      }
      const posts = await this.prismaService.post.findMany({
        // where: wherePart,
        orderBy: { createdAt: 'desc' },
      });

      if (!posts) {
        throw new NotFoundException('No posts found');
      }
      return posts;
    } catch (error) {
      console.error('Original error:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch posts');
    }
  }

  async findOnePost(id: number): Promise<Post | null> {
    try {
      const post = await this.prismaService.post.findUnique({
        where: { id },
      });

      if (!post) {
        throw new NotFoundException('Post not found');
      }

      return post;
    } catch (error) {
      console.error('Original error:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch the post');
    }
  }

  async getPublishedPosts(): Promise<Post[]> {
    try {
      const publishedPosts = await this.prismaService.post.findMany({
        where: { published: true },
      });
      if (publishedPosts.length == 0) {
        throw new NotFoundException('No published posts found');
      }
      return publishedPosts;
    } catch (error) {
      console.error('Original error:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch published posts');
    }
  }

  async getDraftPosts() {
    try {
      const drafts = await this.prismaService.post.findMany({
        where: { published: false },
      });
      if (drafts.length == 0) {
        throw new NotFoundException('There is no post in drafts');
      }
      return drafts;
    } catch (error) {
      console.error('Original error:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch draft posts');
    }
  }

  async updatePost(
    id: number,
    updatePostDto: Prisma.PostUpdateInput,
  ): Promise<Post | null> {
    try {
      const post = await this.prismaService.post.update({
        where: { id },
        data: updatePostDto,
      });

      if (!post) {
        throw new NotFoundException('Post not found');
      }

      return post;
    } catch (error) {
      console.error('Original error:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update the post');
    }
  }

  async deletePost(id: number): Promise<string> {
    try {
      const post = await this.prismaService.post.delete({ where: { id } });

      if (!post) {
        throw new NotFoundException('Post not found');
      }
      return 'Post deleted successfully...';
    } catch (error) {
      console.error('Original error:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete the post');
    }
  }
}
