import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentsDto } from './dto/create-comment-dto';

import { IDeveloper } from 'src/developer/interfaces/developer.interface';
import { CommentsParams } from './interfaces/comments-params.interface';
import { Comments, CommentsDocument } from './schemas/comments.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name)
    private readonly commentModel: Model<CommentsDocument>,
  ) {}

  async getConstructComment(
    createCommentsDto: CreateCommentsDto,
    developer: IDeveloper,
  ) {
    const newCommentObj = {
      description: createCommentsDto.description
        ? createCommentsDto.description
        : '',
      authorId: developer._id ? developer._id : '',
      postId: createCommentsDto.postId ? createCommentsDto.postId : '',
    };

    return newCommentObj;
  }

  // create comment
  async createComment(
    createCommentsDto: CreateCommentsDto,
    developer: IDeveloper,
  ) {
    // get the comment object
    const newComment = await this.getConstructComment(
      createCommentsDto,
      developer,
    );

    // create a new model with dto
    return await this.commentModel.create(newComment);
  }

  // get comments
  async getComments(commentsParams: CommentsParams) {
    const { postId } = commentsParams;
    const comments = await this.commentModel.find({
      postId: postId,
    });

    return comments;
  }
}
