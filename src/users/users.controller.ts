import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('signup')
  create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Post('login')
  login(@Body() user: { email: string; password: string }) {
    return this.userService.login(user);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post('follow/:id')
  follow(@Param() param, @Request() req) {
    return this.userService.follow(param.id, req);
  }

  @Post('unfollow/:id') // New route for unfollow
  unfollow(@Param() param, @Request() req) {
    return this.userService.unfollow(param.id, req);
  }
  @Put(':id')
  update(@Param() params, @Body() user: User, @Request() req) {
    console.log(params + '   ' + user);
    return { params, user };
    //return (this.userService.updateOne(params.id,user));
  }
}
