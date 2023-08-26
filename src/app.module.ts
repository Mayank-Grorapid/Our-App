import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatsModule } from './chats/chats.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { url } from 'inspector';
import { User } from './users/dto/user.dto';
import { UserEntity } from './users/entity/user.entity';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { PostEntity } from './posts/entity/posts.entity';

@Module({
  imports: [AuthModule, 
    ChatsModule, 
    PostsModule, UsersModule, 
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type:'postgres',
      url:process.env.db_url,
      synchronize:true,
      ssl:true,
      entities:[UserEntity,PostEntity]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).exclude('users/signup','users/login').forRoutes({path:'*',method:RequestMethod.ALL})
  }
}
