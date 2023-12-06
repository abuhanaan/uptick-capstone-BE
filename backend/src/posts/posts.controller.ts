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
  UploadedFile,
  ParseFilePipe,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Create a new post' })
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile(new ParseFilePipe({ validators: [] }))
    file: Express.Multer.File,
  ) {
    console.log('Post Controller');
    return this.postsService.create(
      createPostDto,
      file.originalname,
      file.buffer,
    );
  }

  @Get()
  @ApiOperation({ summary: 'get all posts' })
  @ApiResponse({
    status: 200,
    type: [Post],
  })
  async getAllPosts(@Query() { tag }) {
    return this.postsService.findAllPost(tag);
  }

  @Get('/published')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: [Post],
  })
  @ApiBearerAuth()
  async getPublishedPosts() {
    return this.postsService.getPublishedPosts();
  }

  @Get('/drafts')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    type: [Post],
  })
  @ApiBearerAuth()
  async getDraftPosts() {
    return this.postsService.getDraftPosts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get a single posts' })
  @ApiResponse({
    status: 200,
    type: Post,
  })
  async getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOnePost(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'update a  post' })
  @ApiResponse({
    status: 200,
    type: Post,
  })
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'delete sa post' })
  @ApiResponse({
    type: 'Post deleted successfully',
  })
  async deletePost(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.postsService.deletePost(id);
  }
}
