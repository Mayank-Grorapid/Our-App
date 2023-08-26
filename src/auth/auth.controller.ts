import { Controller } from '@nestjs/common';
import { User } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    // constructor(private readonly authservice:AuthService){}
    // genrateJwt(user:User){
    //     return this.authservice.genrateJwt(user);
    // }
    // hashPassword(password:string){
    //     return this.authservice.hashPassword(password);
    // }
    // comaparePassword(password:string,hashPassword:string){
    //     return this.authservice.comparePassword(password,hashPassword);
    // }
}
