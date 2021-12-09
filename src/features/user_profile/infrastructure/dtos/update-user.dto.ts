import { PartialType } from '@nestjs/swagger';
import { CreateUserProfileDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserProfileDto) {}
