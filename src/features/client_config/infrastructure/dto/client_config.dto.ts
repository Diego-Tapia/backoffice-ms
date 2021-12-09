import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEmail,
} from 'class-validator';

export class ClientConfigDto {
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsString()
  @IsNotEmpty()
  logo: string;

  @IsString()
  @IsNotEmpty()
  banner: string;

  @IsString()
  @IsNotEmpty()
  mainColor: string;
  
  @IsString()
  @IsNotEmpty()
  secondaryColor: string

  @IsString()
  @IsNotEmpty()
  domain: string

  @IsString()
  @IsNotEmpty()
  verifyUser: string

}
