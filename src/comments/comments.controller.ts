import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from './comments.service';
import { CreateCommentsDto } from './dto/create-comment-dto';
import { CommentsParams } from './interfaces/comments-params.interface';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}
  //   create a post
  @Post('/comment')
  @UseGuards(AuthGuard('jwt'))
  async createComment(@Body() createCommentsDto: CreateCommentsDto) {
    return await this.commentsService.createComment(createCommentsDto);
  }

  @Get('/comment/:postId')
  @UseGuards(AuthGuard('jwt'))
  async getComments(@Param() commentsParams: CommentsParams) {
    return await this.commentsService.getComments(commentsParams);
  }
}
