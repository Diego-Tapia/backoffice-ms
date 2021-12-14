import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
  Get,
  Param,
  Request,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponse } from 'src/features/admin/infrastructure/models/auth-response.model';
import { IUserGetAllByClientIdApplication } from 'src/features/user/application/user-get-all-by-client-id/user-get-all-by-client-id.app.interface';
import { IUserGetByIdApplication } from 'src/features/user/application/user-get-by-id/user-get-by-id-app.interface';
import { IUserRegisterApplication } from 'src/features/user/application/user-register/user-register.app.interface';
import { UserRegisterDTO } from 'src/features/user/infrastructure/dto/user-register.dto';
import { UserTypes } from 'src/features/user/user.types';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    @Inject(UserTypes.APPLICATION.USER_REGISTER)
    private readonly userRegisterApplication: IUserRegisterApplication,
    @Inject(UserTypes.APPLICATION.USER_GET_ALL_BY_CLIENT_ID)
    private readonly userGetAllByClientIdApplication: IUserGetAllByClientIdApplication,
    @Inject(UserTypes.APPLICATION.USER_GET_BY_ID)
    private readonly userGetByIdApplication: IUserGetByIdApplication,
  ) {}

  @Post('register')
  async register(@Body() userRegisterDTO: UserRegisterDTO) {
    try {
      return await this.userRegisterApplication.execute(userRegisterDTO);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get('by-client-id')
  @ApiResponse({
    status: 201,
    description: 'Retorna todos los usuarios correspondientes a un "client_id"',
    type: AuthResponse,
  })
  findAll(@Request() req) {
    return this.userGetAllByClientIdApplication.execute(req);
  }

  @Get(':id')
  @ApiResponse({
    status: 201,
    description: 'Retorna un usuario por su ID',
    type: AuthResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
    type: AuthResponse,
  })
  findById(@Param('id') id: string) {
    return this.userGetByIdApplication.execute(id);
  }
}
