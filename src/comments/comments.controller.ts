import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from './comments.service';
import { CreateCommentsDto } from './dto/create-comment-dto';

@Controller('comments')
export class CommentsController {
  constructor(private postsService: CommentsService) {}
  //   create a post
  @Post('/comment')
  @UseGuards(AuthGuard('jwt'))
  async createComment(
    @Body() createCommentsDto: CreateCommentsDto,
    @Res() response,
  ) {
    return this.postsService.createComment(createCommentsDto, response);
  }
}
