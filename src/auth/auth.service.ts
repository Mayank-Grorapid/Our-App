import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/dto/user.dto';
import *as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService:JwtService){}

    genrateJwt(user:User){
        return  this.jwtService.signAsync(user);
    }

    hashPassword(password:string){
        return bcrypt.hash(password,10);
    }

    comparePassword(password:string,hashPassword:string){
        return bcrypt.compare(password,hashPassword);
    }

    async verifyJwt(token:string){
        try{
            const user = await this.jwtService.verifyAsync(token);
            if(!user) throw new Error('Invalid Token');
            // console.log("user",user,"token",token );
        }
        catch(err){
            throw err;
        }
    }
}
