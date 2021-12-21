import { IsEnum, IsString } from 'class-validator';
import { ERole } from '../../domain/enums/role.enum';

export class RoleDto {
  @IsString()
  @IsEnum(ERole)
  public readonly name: string;
  
  @IsString()
  public readonly description: string;
}
