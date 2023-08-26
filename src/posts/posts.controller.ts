import { Body, Controller, Delete, Get, Param, Post,Put,Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Posts } from './dto/posts.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService:PostsService){}

    @Get()
    async getAll(){
        return await this.postService.getAll();
        }
    @Post()
    async createPost(@Body() post:Posts,@Request() req){
        return  await this.postService.createPost(post,req);
    }

    @Delete(':id')
    async deletePost(@Param() param,@Request() req){
        return this.postService.deletePost(param.id,req);
    }

    @Post('like/:id')
    async likePost(@Param() param, @Request() req){
        return this.postService.likePost(param.id,req);
    }

    @Post('dislike/:id')
    async dislikePost(@Param() param, @Request() req){
        return this.postService.dislikePost(param.id,req);
    }

    @Get(':title')
    async getPostByTitle(@Param() param){
        return this.postService.searchPostByTitle(param.title);
    }

    @Put(':id')
    async updatePost(@Param() param,@Body() post:Posts,@Request() req){
        return this.postService.updatePost(param.id,post,req);
    }
}
