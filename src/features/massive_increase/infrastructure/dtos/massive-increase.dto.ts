import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsMongoId,
  IsEnum,
} from 'class-validator';
import { EMassiveIncreaseAction } from '../../domain/enums/massive-increase-action.enum';

export class MassiveIncreaseDto {
  @IsString()
  @IsNotEmpty()
  public readonly tokenId: string;

  @IsString()
  @IsEnum(EMassiveIncreaseAction)
  public readonly action: string;

  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsOptional()
  @IsMongoId()
  @IsString()
  public readonly massiveIncreaseId?: string;
}
