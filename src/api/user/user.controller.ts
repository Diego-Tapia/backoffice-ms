import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IUserRegisterApplication } from 'src/features/user/application/user-register/user-register.app.interface';
import { UserRegisterDTO } from 'src/features/user/infrastructure/dto/user-register.dto';
import { UserTypes } from 'src/features/user/user.types';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    @Inject(UserTypes.APPLICATION.USER_REGISTER)
    private readonly userRegisterApplication: IUserRegisterApplication,
  ) {}

  @Post('register')
  async register(@Body() userRegisterDTO: UserRegisterDTO) {
    try {
      return await this.userRegisterApplication.execute(userRegisterDTO);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
