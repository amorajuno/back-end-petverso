import { IsInt, IsString } from 'class-validator';
export class CreateProdutoDto {
  @IsString()
  nome: string;

  @IsString()
  categoria: string;

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
  empresaID: string;

  @IsInt()
  categoriaID: number;
}
