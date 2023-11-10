import { Controller, Req, Post, UseGuards, Inject, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import RequestWithUser from '../models/requestWithUser.model';
import { AuthService } from './../services/auth.service';
import { UsersService } from './../../users/services/users.service';
import { User } from './../../users/entities/user.entity';
import JwtRefreshGuard from '../guards/jwtRefresh.guard';
import {JwtAuthGuard} from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor (
    private authService: AuthService,
    @Inject(UsersService) private userService: UsersService

  ){}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: RequestWithUser){
    const { user } = req;
    // return this.authService.genarateJWT(user);
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.id);
    const {
      cookie: refreshTokenCookie,
      token: refreshToken
    } = this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.userService.setCurrentRefreshToken(refreshToken, user.id);
    req.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
    console.log(refreshToken);
    console.log(refreshTokenCookie);

    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() req: RequestWithUser) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(req.user.id);

    req.res.setHeader('Set-Cookie', accessTokenCookie);
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser) {
    await this.userService.removeRefreshToken(request.user.id);
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
  }
}
