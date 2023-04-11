import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SkillsParams } from 'src/skills/interfaces/skills-params.interface';
import { CreatePostDto } from './dto/create-post-dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  //   create a post
  @Post('/post')
  @UseGuards(AuthGuard('jwt'))
  async createPost(@Body() createPostDto: CreatePostDto, @Res() response) {
    return this.postsService.createPost(createPostDto, response);
  }

  //   get all posts
  @Get('/:authorId')
  @UseGuards(AuthGuard('jwt'))
  async getPosts(@Param() postParams: SkillsParams) {
    return this.postsService.getPosts(postParams);
  }
}
