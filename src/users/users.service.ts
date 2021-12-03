import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserRole } from './enum/role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  async create(data: Prisma.UserCreateInput, role: UserRole): Promise<User> {
    const emailInUse = await this.db.user.findUnique({
      where: { email: data.email },
    });

    if (emailInUse) {
      throw new ConflictException('Email já está cadastrado');
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
    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.db.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('ID não encontrado');
    }

    delete user.password;
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
    delete user.email;
    delete user.id;
    return user;
  }

  async findMany() {
    const user = await this.db.user.findMany();
    const userView = user.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ password, id, role, createdAt, ...res }) => res,
    );
    return userView;
  }

  async findAll() {
    return this.db.user.findMany({});
  }

  async deleteOne(id: string): Promise<{ message: string }> {
    await this.db.user.delete({
      where: { id },
    });

    return {
      message: 'Deletado com sucesso',
    };
  }
}
