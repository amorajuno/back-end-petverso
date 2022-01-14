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
import { Company } from '@prisma/client';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { UserRole } from '../users/enum/role.enum';
import { Role } from 'src/auth/role/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role/roles.guard';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  // ROTA OK //
  @Post('registrar')
  create(@Body() data: CreateCompanyDto): Promise<Company> {
    return this.companyService.create(data, UserRole.USER_COM);
  }

  // ROTA OK //
  @Get('todas')
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  @Role(UserRole.USER_COM)
  @UseGuards(AuthGuard(), RolesGuard)
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  @Role(UserRole.USER_COM)
  @UseGuards(AuthGuard(), RolesGuard)
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  // ROTA OK //
  @Delete('apagar/:id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
