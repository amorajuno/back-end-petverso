import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Company, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import * as cnpj from 'cnpj';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/users/enum/role.enum';

@Injectable()
export class CompanyService {
  constructor(private db: PrismaService) {}

  async create(
    data: Prisma.CompanyCreateInput,
    role: UserRole,
  ): Promise<Company> {
    const cnpjInUse = await this.db.company.findUnique({
      where: { cnpj: data.cnpj },
    });
    if (cnpjInUse) {
      throw new BadRequestException(
        'Company/CNPJ já está cadastrada no nosso banco de dados!',
      );
    }

    if (!cnpj.validate(data.cnpj)) {
      throw new BadRequestException('Cnpj inválido');
    }
    const emailInUse = await this.db.company.findUnique({
      where: { email: data.email },
    });
    if (emailInUse) {
      throw new BadRequestException('Email já está cadastrado');
    }
    const saltRounds = 13;
    const cryptPass = await bcrypt.hash(data.password, saltRounds);

    const company = this.db.company.create({
      data: {
        ...data,
        role: role,
        password: cryptPass,
        passwordConfirmation: cryptPass,
      },
    });

    delete (await company).password;
    delete (await company).passwordConfirmation;
    return company;
  }

  async findAll(): Promise<Company[]> {
    const companys = await this.db.company.findMany();
    return companys;
  }

  async findOne(id: string): Promise<Company> {
    const company = await this.db.company.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!company) {
      throw new NotFoundException('ID não encontrado');
    }

    return company;
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return this.db.company.update({
      where: { id },
      data: updateCompanyDto,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.db.company.delete({ where: { id } });

    return { message: `Company com ID: ${id} deletada com sucesso.` };
  }
}
