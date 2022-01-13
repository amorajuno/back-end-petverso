import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserRole } from './enum/role.enum';
import * as bcrypt from 'bcrypt';
import * as cpfValidate from 'node-cpf';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}
  async create(data: Prisma.UserCreateInput, role: UserRole): Promise<User> {
    console.log(data);
    const emailInUse = await this.db.user.findUnique({
      where: { email: data.email },
    });

    if (!cpfValidate.isMasked(data.cpf)) {
      cpfValidate.mask(data.cpf);
    }

    if (!cpfValidate.validate(data.cpf)) {
      throw new BadRequestException('CPF inválido');
    }
    if (emailInUse) {
      throw new BadRequestException('Email já está cadastrado');
    }
    const saltRounds = 13;
    const cryptPass = await bcrypt.hash(data.password, saltRounds);

    const user = this.db.user.create({
      data: {
        ...data,
        role: role,
        password: cryptPass,
        passwordConfirmation: cryptPass,
      },
    });

    delete (await user).password;
    delete (await user).passwordConfirmation;

    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.db.user.findUnique({
      where: { id },
      include: { carts: true },
    });
    if (!user) {
      throw new NotFoundException('ID não encontrado');
    }

    delete user.password;
    delete user.passwordConfirmation;
    return user;
  }

  async findOneByName(username: string): Promise<User> {
    const user = await this.db.user.findFirst({
      where: { username },
    });
    if (!user) {
      throw new NotFoundException('Username não encontrado');
    }

    delete user.password;
    delete user.passwordConfirmation;
    delete user.email;
    delete user.id;
    return user;
  }

  async findMany() {
    const user = await this.db.user.findMany();
    const userView = user.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ password, passwordConfirmation, role, createdAt, ...res }) => res,
    );
    return userView;
  }

  async findAll() {
    return this.db.user.findMany({});
  }

  // async updateOne(
  //   data: UpdateUserDto,
  //   id: string,
  // ): Promise<User> {
  //   return this.db.user.update({ where: { id }, data: { data } });
  // }

  async deleteOne(id: string): Promise<{ message: string }> {
    await this.db.user.delete({
      where: { id },
    });

    return {
      message: 'Deletado com sucesso',
    };
  }
}
