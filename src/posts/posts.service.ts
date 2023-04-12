import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDeveloper } from 'src/developer/interfaces/developer.interface';
import { CreatePostDto } from './dto/create-post-dto';
import { IGetPostParams } from './interfaces/get-post-params.interface';
import { Posts, PostsDocument } from './schemas/posts.schema';

@Injectable()
export class PostsService {
  // initialize
  constructor(
    @InjectModel(Posts.name)
    private readonly postModel: Model<PostsDocument>,
  ) {}

  // create post object
  async getConstructPost(
    createPostDto: CreatePostDto,
    developer: IDeveloper,
  ): Promise<any> {
    const newContructedPost = {
      title: createPostDto.title ? createPostDto.title : '',
      description: createPostDto.description ? createPostDto.description : '',
      authorId: developer._id ? developer._id : '',
    };

    return newContructedPost;
  }

  // // crete post update object
  // async getContructUpdatePost(): Promise<any> {
  //   const newContructedPost = {
  //     title:
  //   }
  // }

  // create post
  async createPost(createPostDto: CreatePostDto, developer: IDeveloper) {
    // create Post object with user information
    const newPost: Posts = await this.getConstructPost(
      createPostDto,
      developer,
    );

    return await this.postModel.create(newPost);
  }

  // get posts
  async getPosts(postParams: IGetPostParams) {
    const { authorId } = postParams;

    return await this.postModel.find({ authorId: authorId });
  }

  // update post

  // async updatePost(updatePostParams: IGetPostParams) {
  //   const { postId } = updatePostParams;

  //   const updatedPost = await this.getContructUpdatePost();

  //   return await this.postModel.findByIdAndUpdate(postId, updatedPost);
  // }
}
