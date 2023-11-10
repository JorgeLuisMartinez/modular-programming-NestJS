import { Injectable, Inject } from '@nestjs/common';
import { ConfigType} from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

import { UsersService } from './../../users/services/users.service';
import { User } from './../../users/entities/user.entity';
import { PayloadToken } from './../models/token.model';
import  TokenPayload  from './../models/tokenPayload.model';
import config  from './../../config';


@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>
    ){}

  async validateUser(email:string, password:string){
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
    }
    return null
  }

  async genarateJWT(user: User) {
    const payload: PayloadToken = {
      role: user.role,
      sub: user.id
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
  public getCookieWithJwtAccessToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.jwtSecret,
      expiresIn: `${this.configService.jwtExpirationTime}s`
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.jwtExpirationTime}`;
  }

  public getCookieWithJwtRefreshToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.jwtRefreshSecret,
      expiresIn: `${this.configService.jwtRefreshExpiration}`
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.jwtRefreshExpiration}`;
    return {
      cookie,
      token
    }
  }

  public getCookiesForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0'
    ];
  }

}
