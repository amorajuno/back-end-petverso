import { IsString } from 'class-validator';
import { Empresa } from '@prisma/client';
export class LoginDtoEm {
  cnpj: string;

  @IsString()
  password: string;
}

export class AuthResponseEm {
  token: string;
  empresa: Empresa;
}
