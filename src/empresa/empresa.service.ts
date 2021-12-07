import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Empresa, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import * as cnpj from 'cnpj';

@Injectable()
export class EmpresaService {
  constructor(private db: PrismaService) { }

  async create(data: Prisma.EmpresaCreateInput): Promise<Empresa> {
    const cnpjInUse = await this.db.empresa.findUnique({
      where: { cnpj: data.cnpj },
    });
    if (cnpjInUse) {
      throw new BadRequestException(
        'Empresa/CNPJ já está cadastrada no nosso banco de dados!',
      );
    }

    if (!cnpj.validate(data.cnpj)) {
      throw new BadRequestException('Cnpj inválido');
    }
    const emailInUse = await this.db.empresa.findUnique({
      where: { email: data.email },
    });
    if (emailInUse) {
      throw new BadRequestException('Email já está cadastrado');
    }
    const empresa = await this.db.empresa.create({ data });
    return empresa;
  }

  async findAll(): Promise<Empresa[]> {
    const empresas = await this.db.empresa.findMany();
    return empresas;
  }

  async findOne(id: string): Promise<Empresa> {
    const empresa = await this.db.empresa.findUnique({
      where: { id },
    });

    if (!empresa) {
      throw new NotFoundException('ID não encontrado');
    }

    return empresa;
  }

  update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    return `This action updates a #${id} empresa`;
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.db.empresa.delete({ where: { id } });

    return { message: `Empresa com ID: ${id} deletada com sucesso.` };
  }
}
