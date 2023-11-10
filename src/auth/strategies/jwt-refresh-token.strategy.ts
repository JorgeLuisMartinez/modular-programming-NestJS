import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigType} from '@nestjs/config';

import config  from './../../config';
import { Request } from 'express';
import { UsersService } from '../../users/services/users.service';
import TokenPayload from '../models/tokenPayload.model';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token'
) {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Refresh;
      }]),
      secretOrKey: configService.jwtRefreshSecret,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayload) {
    const refreshToken = request.cookies?.Refresh;
    return this.userService.getUserIfRefreshTokenMatches(refreshToken, payload.userId);
  }
}
