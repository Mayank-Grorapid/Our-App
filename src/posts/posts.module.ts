import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entity/user.entity';
import { PostEntity } from './entity/posts.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity,PostEntity])
  ],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
