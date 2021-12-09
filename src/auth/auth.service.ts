import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthResponse, LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseEm, LoginDtoEm } from './dto/login-empresa.dto';

@Injectable()
export class AuthService {
  constructor(private db: PrismaService, private jwt: JwtService) {}

  async login(login: LoginDto): Promise<AuthResponse> {
    const { email, password } = login;

    const user = await this.db.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const hashValid = await bcrypt.compare(password, user.password);

    if (!hashValid) {
      throw new UnauthorizedException('Senha inválida');
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
    const empresa = await this.db.empresa.findUnique({
      where: { cnpj },
    });

    if (!empresa) {
      throw new NotFoundException('Empresa não encontrada');
    }
    const hashValid = await bcrypt.compare(password, empresa.password);

    if (!hashValid) {
      throw new UnauthorizedException('Senha inválida');
    }

    delete empresa.password;
    delete empresa.passwordConfirmation;
    return {
      token: this.jwt.sign({ cnpj }),
      empresa,
    };
  }
}
