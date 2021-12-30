import { AdminRegisterDTO } from "./admin-register.dto";
import { PartialType, OmitType } from '@nestjs/mapped-types';
export class UpdateAdminDto extends PartialType(
    OmitType(AdminRegisterDTO, ['username', 'password'] as const),
  ) {}
