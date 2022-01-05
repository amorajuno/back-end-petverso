import { IsInt, IsString } from 'class-validator';
import { isNumber } from 'util';
export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsString()
  imgUrl: string;

  @IsString()
  animalType: string;

  @IsInt()
  price: number;

  @IsString()
  description: string;

  @IsString()
  contains: string;

  @IsString()
  restrictions: string;

  @IsInt()
  quantity: number;

  @IsString()
  companyID: string;

  @IsInt()
  categoryID: number;
}
