import { IsString } from 'class-validator';
import { Company } from '@prisma/client';
export class LoginDtoEm {
  cnpj: string;

  @IsString()
  password: string;
}

export class AuthResponseEm {
  token: string;
  company: Company;
}
