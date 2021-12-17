import { ApiProperty } from '@nestjs/swagger';
import { Admin } from '../entities/admin.entity';

export class AuthResponse {
  @ApiProperty()
  token: string;

  @ApiProperty()
  admin: Admin
}
