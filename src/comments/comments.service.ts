import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comments, CommentsDocument } from './comments.model';
import { CreateCommentsDto } from './dto/create-comment-dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name)
    private readonly postModel: Model<CommentsDocument>,
  ) {}

  async createComment(createCommentsDto: CreateCommentsDto, response) {
    // create a new model with dto
    const comments = new this.postModel(createCommentsDto);

    const res = await comments.save();

    // return response
    response
      .status(HttpStatus.CREATED)
      .json({ message: 'Successfully Created Comment', post: res });
  }
}
