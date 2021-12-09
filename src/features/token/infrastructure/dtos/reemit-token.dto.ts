import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class ReemitTokenDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  public readonly amount: number;
}