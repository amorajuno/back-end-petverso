import { IsInt, IsString } from 'class-validator';
export class CreateProductDto {
  @IsString()
  nome: string;

  @IsString()
  category: string;

  @IsString()
  tipoAnimal: string;

  @IsInt()
  preco: number;

  @IsString()
  descricao: string;

  @IsString()
  conteudo: string;

  @IsString()
  restricao: string;

  @IsString()
  companyID: string;

  @IsInt()
  categoryID: number;
}
