import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsMongoId,
  IsEnum,
} from 'class-validator';
import { EMassiveAction } from '../../domain/enums/massive-action.enum';

export class CreateMassiveDto {
  @IsString()
  @IsNotEmpty()
  public readonly tokenId: string;

  @IsString()
  @IsEnum(EMassiveAction)
  public readonly action: string;

  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsOptional()
  @IsMongoId()
  @IsString()
  public readonly massiveId?: string;
}
