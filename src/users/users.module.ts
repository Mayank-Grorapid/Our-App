import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [UsersService,AuthService]
})
export class UsersModule {}
