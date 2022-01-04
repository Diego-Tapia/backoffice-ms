import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IUpdateUserApplication } from 'src/features/user/application/update-user/update-user-app.interface';
import { IUserRegisterApplication } from 'src/features/user/application/register-user/register-user.app.interface';
import { IValidateUserApplication } from 'src/features/user/application/validate-user/validate-user-app.interface';
import { UserTypes } from 'src/features/user/user.types';
import { IGetUserByIdApplication } from 'src/features/user/application/get-user-by-id/get-user-by-id-app.interface';
import { IGetAllUserApplication } from 'src/features/user/application/get-all-user/get-all-user-app.interface';
import { RegisterUserDto } from 'src/features/user/infrastructure/dto/register-user.dto';
import { UpdateUserDto } from 'src/features/user/infrastructure/dto/update-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    @Inject(UserTypes.APPLICATION.REGISTER_USER)
    private readonly userRegisterApplication: IUserRegisterApplication,
    @Inject(UserTypes.APPLICATION.GET_USER_BY_ID)
    private readonly getUserByIdApplication: IGetUserByIdApplication,
    @Inject(UserTypes.APPLICATION.GET_ALL_USER)
    private readonly getAllUserApplication: IGetAllUserApplication,
    @Inject(UserTypes.APPLICATION.VALIDATE_USER)
    private readonly validateUser: IValidateUserApplication,
    @Inject(UserTypes.APPLICATION.UPDATE_USER)
    private readonly updateUser: IUpdateUserApplication,
  ) {}

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.getUserByIdApplication.execute(id)
  }

  @Get()
  findAll(@Request() req){
    return this.getAllUserApplication.execute(req)
  }

  @Get('verify-user/:userIdentifier')
  verifyUser(@Param('userIdentifier') userIdentifier: string, @Request() request) {
    return this.validateUser.execute(userIdentifier, request)
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    try {
      return await this.userRegisterApplication.execute(registerUserDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  
  // Con UsePipes y Whitelist:true valida el DTO con PartialTypes y OmitTypes
  // Sin eso directamente te deja cambiar todos los params
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUser.execute(id, updateUserDto);
  }
}
