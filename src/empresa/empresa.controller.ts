import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Empresa } from '@prisma/client';
import { EmpresaService } from './empresa.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { UserRole } from './enum/role.enum';
import { Role } from 'src/auth/role/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role/roles.guard';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  // ROTA OK //
  @Post('registrar')
  create(@Body() data: CreateEmpresaDto): Promise<Empresa> {
    return this.empresaService.create(data, UserRole.USER_COM);
  }

  // ROTA OK //
  @Get('todas')
  findAll() {
    return this.empresaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empresaService.findOne(id);
  }

  @Role(UserRole.USER_COM)
  @UseGuards(AuthGuard(), RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresaService.update(id, updateEmpresaDto);
  }

  // ROTA OK //
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresaService.remove(id);
  }
}
