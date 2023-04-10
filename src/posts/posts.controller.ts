import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from './dto/create-post-dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('/post')
  @UseGuards(AuthGuard('jwt'))
  async createPost(@Body() createPostDto: CreatePostDto, @Res() response) {
    return this.postsService.createPost(createPostDto, response);
  }
}
