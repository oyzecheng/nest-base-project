import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import ConfigEnum from '../../enum/configEnum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get(ConfigEnum.JWT_SECRET),
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const user = this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    return user;
  }
}
