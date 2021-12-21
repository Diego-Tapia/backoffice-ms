import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
export class IndividualDecrementDto {
  
  @IsString()
  @IsNotEmpty()
  public readonly tokenId: string;
  
  @IsNotEmpty()
  public readonly userIdentifier: string | number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public readonly amount: number;

  @IsString()
  @MaxLength(256)
  public readonly notes: string;
}