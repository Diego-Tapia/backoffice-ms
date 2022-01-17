import { BadRequestException, Body, Controller, Get, Inject, Logger, Param, Patch, Post, Put, Request, UsePipes, ValidationError } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminTypes } from 'src/features/admin/admin.types';
import { IAdminConfirmApplication } from 'src/features/admin/application/admin-confirm/admin-confirm-app.interface';
import { IAdminLoginApplication } from 'src/features/admin/application/admin-login/admin-login-app.interface';
import { IAdminRegisterApplication } from 'src/features/admin/application/admin-register/admin-register-app.interface';
import { AdminConfirmDTO } from 'src/features/admin/infrastructure/dto/admin-confirm.dto';
import { AdminLoginDTO } from 'src/features/admin/infrastructure/dto/admin-login.dto';
import { AdminRegisterDTO } from 'src/features/admin/infrastructure/dto/admin-register.dto';
import { AuthResponse } from 'src/features/admin/domain/response/auth.response';
import { IGetAdminByClientIdApplication } from 'src/features/admin/application/admin-get-by-client-id/admin-get-by-client-id.app.interface';
import { IGetAdminByIdApplication } from 'src/features/admin/application/admin-get-by-id/admin-get-by-id.app.interface';
import { UpdateAdminDto } from 'src/features/admin/infrastructure/dto/update-admin.dto';
import { IAdminUpdateApplication } from 'src/features/admin/application/admin-update/admin-update-app.interface';
import { ValidationPipe } from '@nestjs/common';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(
    @Inject(AdminTypes.APPLICATION.ADMIN_REGISTER)
    private readonly adminRegisterApplication: IAdminRegisterApplication,
    @Inject(AdminTypes.APPLICATION.ADMIN_CONFIRM)
    private readonly adminConfirmApplication: IAdminConfirmApplication,
    @Inject(AdminTypes.APPLICATION.ADMIN_LOGIN)
    private readonly adminLoginApplication: IAdminLoginApplication,
    @Inject(AdminTypes.APPLICATION.GET_BY_CLIENT_ID)
    private readonly getAdminByClientIdApplication: IGetAdminByClientIdApplication,
    @Inject(AdminTypes.APPLICATION.GET_BY_ID)
    private readonly getAdminByIdApplication: IGetAdminByIdApplication,
    @Inject(AdminTypes.APPLICATION.ADMIN_UPDATE)
    private readonly adminUpdateApplication: IAdminUpdateApplication,
    
  ) {}

  @Post('register')
  async register(@Body() userRegisterDTO: AdminRegisterDTO) {
    try {
      return await this.adminRegisterApplication.execute(userRegisterDTO);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('confirm')
  async confirm(@Body() userConfirmDTO: AdminConfirmDTO) {
    try {
      return await this.adminConfirmApplication.execute(userConfirmDTO);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('login')
  @ApiResponse({status:201, description: 'Retorna el token que se utiliza para accceder a las rutas', type: AuthResponse})
  async login(@Body() userLoginDTO: AdminLoginDTO) {
    try {
      return await this.adminLoginApplication.execute(userLoginDTO);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get()
  findAll(@Request() req){
    return this.getAdminByClientIdApplication.execute(req)
  }

  @Get(':id')
  findById(@Param('id') id: string, @Request() request) {
    return this.getAdminByIdApplication.execute(id, request);
  }

  @Put(':id')
  //Con UsePipes y Whitelist:true valida el DTO con PartialTypes y OmitTypes
  //Sin eso directamente te deja cambiar todos los params
  @UsePipes(new ValidationPipe({ 
    whitelist: true,
    forbidNonWhitelisted: true,
  }))
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto, @Request() request) {
    return this.adminUpdateApplication.execute(id, updateAdminDto, request);
  }
}
