import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post-dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('/post')
  async createPost(@Body() createPostDto: CreatePostDto, @Res() response) {
    return this.postsService.createPost(createPostDto, response);
  }
}
