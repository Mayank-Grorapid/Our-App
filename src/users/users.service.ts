import { BadRequestException, Injectable, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { Observable, from, map, catchError, switchMap, throwError } from 'rxjs';
import * as Joi from 'joi';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  async create(user: User): Promise<{ token: string }> {
    this.validate(user);
    console.log(user);
    const hashedPassword = await this.authService.hashPassword(user.password);
    console.log(hashedPassword);
    user.password = hashedPassword;
    console.log(user);
    if ((await this.findone(user.email)) != null) {
      throw new BadRequestException('User already Exists');
    }
    const newUser = await this.userRepository.save(user);
    console.log(newUser);
    const { password, ...result } = newUser;
    const token = await this.authService.genrateJwt(result);
    return { token };
  }

  async findone(email: string) {
    const newUser = await this.userRepository.findOne({ where: { email } });
    if (newUser == null) return newUser;
    const { password, ...result } = newUser;
    return result;
  }
  async findAll() {
    const users = await this.userRepository.find();
    const usersWithoutPasswords = users.map((user) => {
      const { password, ...result } = user;
      return result;
    });
    return usersWithoutPasswords;
  }

  async login(user) {
    const userPassword = user.password;
    const userData: User = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });
    if (userData == null) {
      throw new BadRequestException('Invalid Credentials');
    }
    console.log(userData);
    const { password, ...result } = userData;
    if (this.authService.comparePassword(userPassword, password))
      return this.authService.genrateJwt(result);
    else throw new BadRequestException('Inavlid Username Or Password');
  }


async follow(id: number, @Request() req) {
    const loggedInUserID = req['user'].id;
      
    const userToFollow = await this.userRepository.findOne({
      where: { id: id },
    });
      
    const loggedInUser = await this.userRepository.findOne({
      where: { id: loggedInUserID },
    });
    
    if (!userToFollow || loggedInUserID === userToFollow.id) {
      throw new BadRequestException('Invalid User Id!!!');
    }
    
    if (!userToFollow.followers.includes(loggedInUser.email)) {
      loggedInUser.follows.push(userToFollow.email);
      await this.userRepository.save(loggedInUser);
  
      userToFollow.followers.push(loggedInUser.email);
      await this.userRepository.save(userToFollow);
  
      return "Success";
    } else {
      throw new BadRequestException('Already following the user');
    }
  }
  
  async unfollow(id: number, @Request() req) {
    const loggedInUserID = req['user'].id;
    
    const userToUnfollow = await this.userRepository.findOne({
      where: { id: id },
    });
    
    const loggedInUser = await this.userRepository.findOne({
      where: { id: loggedInUserID },
    });
  
    if (!userToUnfollow || loggedInUserID === userToUnfollow.id) {
      throw new BadRequestException('Invalid User Id!!!');
    }
  
    if (userToUnfollow.followers.includes(loggedInUser.email)) {
      loggedInUser.follows = loggedInUser.follows.filter(email => email !== userToUnfollow.email);
      await this.userRepository.save(loggedInUser);
  
      userToUnfollow.followers = userToUnfollow.followers.filter(email => email !== loggedInUser.email);
      await this.userRepository.save(userToUnfollow);
  
      return "Success";
    } else {
      throw new BadRequestException('You are not following this user');
    }
  }

  validate(user: User) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(25).required(),
      email: Joi.string().email().required(),
      password: Joi.string().alphanum().min(6).max(32).required(),
    }).options({
      abortEarly: false,
    });
    const result = schema.validate(user);
    if (result.error) {
      throw new BadRequestException(result.error.details[0].message);
    }
  }
}
