import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsMongoId,
  IsEnum,
} from 'class-validator';
import { EMassiveDecreaseAction } from '../../domain/enums/massive-decrease-action.enum';

export class MassiveDecreaseDto {
  @IsString()
  @IsNotEmpty()
  public readonly tokenId: string;

  @IsString()
  @IsEnum(EMassiveDecreaseAction)
  public readonly action: string;

  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsOptional()
  @IsMongoId()
  @IsString()
  public readonly massiveDecreaseId?: string;
}
