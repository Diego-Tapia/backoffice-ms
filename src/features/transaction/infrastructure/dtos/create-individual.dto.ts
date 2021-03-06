import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
export class CreateIndividualDto {
  
  @IsString()
  @IsNotEmpty()
  public readonly tokenId: string;
  
  @IsString()
  @IsNotEmpty()
  public readonly userIdentifier: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public readonly amount: number;

  @IsString()
  @MaxLength(256)
  public readonly notes: string;
}