import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthResponse, LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseEm, LoginDtoEm } from './dto/login-company.dto';

@Injectable()
export class AuthService {
  constructor(private db: PrismaService, private jwt: JwtService) {}

  async login(login: LoginDto): Promise<AuthResponse> {
    const { email, password } = login;

    const user = await this.db.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const hashValid = await bcrypt.compare(password, user.password);

    if (!hashValid) {
      throw new UnauthorizedException('Incorrect password');
    }

    delete user.password;
    delete user.passwordConfirmation;
    return {
      token: this.jwt.sign({ email }),
      user,
    };
  }

  async loginCom(login: LoginDtoEm): Promise<AuthResponseEm> {
    const { cnpj, password } = login;
    const company = await this.db.company.findUnique({
      where: { cnpj },
    });

    if (!company) {
      throw new NotFoundException('Company not registered in our database');
    }
    const hashValid = await bcrypt.compare(password, company.password);

    if (!hashValid) {
      throw new UnauthorizedException('Senha inválida');
    }

    delete company.password;
    delete company.passwordConfirmation;
    return {
      token: this.jwt.sign({ cnpj }),
      company,
    };
  }
}
