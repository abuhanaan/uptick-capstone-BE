import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({
    status: 201,
    description: 'Post created successfully',
    type: Post,
  })
  async createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all posts' })
  @ApiResponse({
    status: 200,
    type: [Post],
  })
  async getAllPosts(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    return this.postsService.findAllPost({ skip, take });
  }

  @Get(':id')
  @ApiOperation({ summary: 'get a single posts' })
  @ApiResponse({
    status: 200,
    type: Post,
  })
  async getPostById(@Param('id') id: string) {
    return this.postsService.findOnePost({ id: +id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'update a  post' })
  @ApiResponse({
    status: 200,
    type: Post,
  })
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.updatePost({ id: +id }, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete sa post' })
  @ApiResponse({
    type: 'Post deleted successfully',
  })
  async deletePost(@Param('id') id: string): Promise<string> {
    return this.postsService.deletePost({ id: +id });
  }
}
