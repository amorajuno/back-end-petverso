import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({ message: 'por favor informe um email válido' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'no minimo 6 caracteres' })
  @MaxLength(16, { message: 'no máximo 16 caracteres' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString()
  @MinLength(6)
  @MaxLength(16)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  passwordConfirmation: string;

  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  cep: string;

  @IsString()
  cpf: string;

  @IsString()
  address1: string;

  @IsString()
  address2: string;

  @IsString()
  phone: string;

  @IsString()
  birthday: string;

  @IsString()
  city: string;

  @IsString()
  state: string;
}
