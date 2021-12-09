import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsPositive,
  MaxLength,
  ValidateIf,
  IsOptional,
  IsArray,
  Min,
  IsMongoId,
} from 'class-validator';
export class CreateTokenDto {

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  public readonly shortName: string;

  @IsString()
  @MaxLength(5)
  @IsNotEmpty()
  public readonly symbol: string;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @IsNotEmpty()
  public readonly price: number;

  @IsString()
  @MaxLength(5)
  @IsNotEmpty()
  public readonly money: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({each: true})
  public readonly operations: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({each: true})
  public readonly applicabilities: string[];

  @IsOptional()
  @IsString()
  public readonly description: string;

  @IsOptional()
  @IsDateString()
  public readonly validFrom: Date;

  @IsDateString()
  @ValidateIf((params) => !!params.validFrom)
  public readonly validTo: Date;
}