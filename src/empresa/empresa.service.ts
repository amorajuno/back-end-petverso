import { Injectable } from '@nestjs/common';
import { Empresa, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresaService {
  constructor(private db: PrismaService) {}

  async create(data: Prisma.EmpresaCreateInput): Promise<Empresa> {
    const empresa = await this.db.empresa.create({ data });
    return empresa;
  }

  findAll() {
    return `This action returns all empresa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} empresa`;
  }

  update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    return `This action updates a #${id} empresa`;
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.db.empresa.delete({ where: { id } });

    return { message: `This action removes a #${id} empresa` };
  }
}
