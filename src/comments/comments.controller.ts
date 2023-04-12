import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/get-user-decorator';
import { IDeveloper } from 'src/developer/interfaces/developer.interface';
import { CommentsService } from './comments.service';
import { CreateCommentsDto } from './dto/create-comment-dto';
import { CommentsParams } from './interfaces/comments-params.interface';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  // create a comment
  @Post('/comment')
  @UseGuards(AuthGuard('jwt'))
  async createComment(
    @GetUser() developer: IDeveloper,
    @Body() createCommentsDto: CreateCommentsDto,
  ) {
    return await this.commentsService.createComment(
      createCommentsDto,
      developer,
    );
  }

  @Get('/comment/:postId')
  @UseGuards(AuthGuard('jwt'))
  async getComments(@Param() commentsParams: CommentsParams) {
    return await this.commentsService.getComments(commentsParams);
  }
}
