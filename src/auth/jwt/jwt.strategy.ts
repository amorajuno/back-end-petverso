import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { jwtConstants } from './jwt.constants';
import { error } from 'console';
import { Company, User } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private db: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: { email: string; cnpj: string }) {
    let company: Company = null;
    let user: User = null;
    if (payload.cnpj) {
      company = await this.db.company.findUnique({
        where: { cnpj: payload.cnpj },
      });
      return company ?? error(401);
    } else {
      user = await this.db.user.findUnique({
        where: { email: payload.email },
      });
      return user ?? error(401);
    }
  }
}
