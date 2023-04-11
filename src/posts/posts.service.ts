import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SkillsParams } from 'src/skills/interfaces/skills-params.interface';
import { CreatePostDto } from './dto/create-post-dto';
import { Posts, PostsDocument } from './posts.model';

@Injectable()
export class PostsService {
  // initialize
  constructor(
    @InjectModel(Posts.name)
    private readonly postModel: Model<PostsDocument>,
  ) {}

  async createPost(createPostDto: CreatePostDto, response) {
    // create a new model with dto
    const post = new this.postModel(createPostDto);

    const res = await post.save();

    // return response
    response
      .status(HttpStatus.CREATED)
      .json({ message: 'Successfully Created Post', post: res });
  }

  // get posts
  async getPosts(postParams: SkillsParams) {
    const { authorId } = postParams;

    const posts = await this.postModel.find({ author: authorId });

    return posts;
  }
}
