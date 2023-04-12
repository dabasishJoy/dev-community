import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/get-user-decorator';
import { IDeveloper } from 'src/developer/interfaces/developer.interface';
import { CreatePostDto } from './dto/create-post-dto';
import { IGetPostParams } from './interfaces/get-post-params.interface';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  //create a post
  @Post('/post')
  @UseGuards(AuthGuard('jwt'))
  async createPost(
    @GetUser() developer: IDeveloper,
    @Body() createPostDto: CreatePostDto,
  ) {
    return await this.postsService.createPost(createPostDto, developer);
  }

  //   get all posts
  @Get('/:authorId')
  @UseGuards(AuthGuard('jwt'))
  async getPosts(@Param() postParams: IGetPostParams) {
    return await this.postsService.getPosts(postParams);
  }
}
