import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    JwtModule.registerAsync(
      {
        imports:[ ConfigModule,
        ],
        inject:[ConfigService],
        useFactory:async(configService:ConfigService)=>({
          secret:configService.get('jwt_secret'),
          signOptions:{expiresIn:'1h'}
        })
      })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[JwtModule]
})
export class AuthModule {}
