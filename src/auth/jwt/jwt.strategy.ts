import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { jwtConstants } from './jwt.constants';
import { error } from 'console';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private db: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: { email: string }, comPayload: { cnpj: string }) {
    const user = await this.db.user.findUnique({
      where: { email: payload.email },
    });

    const company = await this.db.company.findUnique({
      where: { cnpj: comPayload.cnpj },
    });
    if (user) {
      if (!user) {
        return error(401);
      }
      return user;
    }
    if (company) {
      if (!company) {
        return error(401);
      }
      return company;
    }
  }
}
