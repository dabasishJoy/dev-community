import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentsDto } from './dto/create-comment-dto';

import { CommentsParams } from './interfaces/comments-params.interface';
import { Comments, CommentsDocument } from './schemas/comments.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name)
    private readonly commentModel: Model<CommentsDocument>,
  ) {}

  async createComment(createCommentsDto: CreateCommentsDto) {
    // create a new model with dto
    const comments = new this.commentModel(createCommentsDto);

    const res = await comments.save();

    // return response
    return res;
  }

  // get comments
  async getComments(commentsParams: CommentsParams) {
    const comments = await this.commentModel.find({
      post: commentsParams.postId,
    });

    return comments;
  }
}
