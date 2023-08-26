import { BadRequestException, Injectable, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entity/posts.entity';
import { Raw, Repository } from 'typeorm';
import { UserEntity } from 'src/users/entity/user.entity';
import { Posts } from './dto/posts.dto';
import * as Joi from 'joi';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postReposity: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepositry: Repository<UserEntity>,
  ) {}
  async getAll() {
    const allPosts = await this.postReposity.find();
    if (!allPosts) {
      throw new BadRequestException('No posts Made till now !!!');
    }
    return allPosts;
  }

  async createPost(post: Posts, @Request() req) {
    this.validate(post);
    const loggedUserID = req['user'].id;
    const loggedUser = await this.userRepositry.findOne({
      where: { id: loggedUserID },
      relations: ['posts'],
    });
    const createdPost = this.postReposity.create({
      ...post,
      author: loggedUser,
    });
    loggedUser.posts.push(createdPost);
    this.userRepositry.save(loggedUser);
    const result = await this.postReposity.save(createdPost);
    return { sucess: true, postID: result.id };
  }

  async updatePost(postID: number, post: Posts, @Request() req) {
    const loggedInUserID = req['user'].id;
    const postToEdit = await this.postReposity.findOne({
      where: { id: postID },
      relations: ['author'],
    });

    if (!postToEdit) {
      throw new BadRequestException('Invalid Post ID!!!!');
    }

    if (postToEdit.author.id !== loggedInUserID) {
      throw new BadRequestException(
        "You don't have permission to edit this post.",
      );
    }

    if (post.content && post.content.length >= 5) {
      postToEdit.content = post.content;
    }

    if (post.description && post.description.length >= 5) {
      postToEdit.description = post.description;
    }

    await this.postReposity.save(postToEdit);
    return { success: true };
  }

  async likePost(postID: number, @Request() req) {
    const loggedInUser = req['user'].id;
    const postToLike = await this.postReposity.findOne({
      where: { id: postID },
    });
    if (!postToLike) {
      throw new BadRequestException('Invalid Post ID');
    }
    const user = await this.userRepositry.findOne({
      where: { id: loggedInUser },
    });
    if (user.likes.includes(postID + '')) {
      throw new BadRequestException(`you already liked the post`);
    }
    if (user.dislikes.includes(postID + '')) {
      const indexOFDislike = user.dislikes.indexOf(postID + '');
      if (indexOFDislike > -1) {
        user.dislikes.splice(indexOFDislike, 1);
      }
      postToLike.dislikes -= 1;
    }
    user.likes.push(postID + '');
    postToLike.likes += 1;
    await this.userRepositry.save(user);
    await this.postReposity.save(postToLike);
    return { sucess: true };
  }

  async deletePost(postId: number, @Request() req) {
    const loggedInUserID = req['user'].id;
    const postToDelete = await this.postReposity.findOne({
      where: { id: postId },
      relations: ['author'],
    });
    if (!postToDelete) {
      throw new BadRequestException('Invalid Post ID!!!');
    }
    if (postToDelete.author.id != loggedInUserID) {
      throw new BadRequestException('The post does not belog to you!!!');
    }
    const loggedUser = await this.userRepositry.findOne({
      where: { id: loggedInUserID },
      relations: ['posts'],
    });
    console.log(loggedUser.posts);
    loggedUser.posts = loggedUser.posts.filter((post) => post.id !== postId);
    await this.userRepositry.save(loggedUser);
    const result = await this.postReposity.remove(postToDelete);
    return {
      sucess: true,
      postID: result.id,
      title: result.title,
      description: result.description,
      content: result.content,
    };
  }

  async dislikePost(postID: number, @Request() req) {
    const loggedInUser = req['user'].id;
    const postToDislike = await this.postReposity.findOne({
      where: { id: postID },
    });

    if (!postToDislike) {
      throw new BadRequestException('Invalid Post ID');
    }

    const user = await this.userRepositry.findOne({
      where: { id: loggedInUser },
    });

    if (user.dislikes.includes(postID + '')) {
      throw new BadRequestException('You already disliked the post');
    }

    if (user.likes.includes(postID + '')) {
      const indexOfLike = user.likes.indexOf(postID + '');
      if (indexOfLike > -1) {
        user.likes.splice(indexOfLike, 1);
      }
      postToDislike.likes -= 1;
    }

    user.dislikes.push(postID + '');
    postToDislike.dislikes += 1;

    await this.userRepositry.save(user);
    await this.postReposity.save(postToDislike);

    return { success: true };
  }

  async searchPostByTitle(title: string) {
    const posts = await this.postReposity.find({
        where: { title: Raw(alias => `${alias} ILIKE '%${title}%'`) },
    });
    if(!posts)
    {
      throw new BadRequestException("No Posts with the title");
    }
    return posts;
}


  validate(post: Posts) {
    const schema = Joi.object({
      title: Joi.string().min(5).max(50).required(),
      description: Joi.string().min(5).max(250).required(),
      content: Joi.string().min(10).required(),
    }).options({
      abortEarly: false,
    });
    const result = schema.validate(post);
    if (result.error) {
      throw new BadRequestException(result.error.details[0].message);
    }
  }
}
