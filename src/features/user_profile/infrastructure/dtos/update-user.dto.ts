import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { IntersectionType } from '@nestjs/swagger';
// import { IntersectionType, PartialType } from '@nestjs/swagger';
import { UserRegisterDTO } from 'src/features/user/infrastructure/dto/user-register.dto';
import { UserUpdateDTO } from 'src/features/user/infrastructure/dto/user-update.dto';
import { CreateUserProfileDto } from './create-user.dto';

// export class UpdateUserDto extends PartialType(CreateUserProfileDto) {}

// export class UpdateUserProfileDto extends PartialType(
//   //Agregar el intersectionType
//     OmitType(CreateUserProfileDto, ['username', 'userId', ] as const),
//   ) {}

  export class UpdateUserProfileDto extends IntersectionType(
    PartialType(
      OmitType(CreateUserProfileDto, ['username', 'userId'] as const)
    ),
    PartialType(
      PickType(UserUpdateDTO, ['status'] as const)
    )
  ) {}
