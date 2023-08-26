import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    if (!token ){
      res.send("Invalid Token");
      return;
    }
    //console.log(token); 
    try {
    const decoded = await this.jwtService.verifyAsync(token);
    req['user'] = decoded;
    // console.log(decoded);

    } catch (error) {
      res.send("Invalid Token!!!");
      return error;
    }

    next();
  }
}    
