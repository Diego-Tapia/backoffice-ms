import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EUserStatus } from '../../domain/enums/user.status.enum';
import { RegisterUserDto } from './register-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(RegisterUserDto, ['clientId', 'customId', 'username', 'password'] as const)
) {
  @IsEnum(EUserStatus)
  @IsOptional()
  status: string;
}
