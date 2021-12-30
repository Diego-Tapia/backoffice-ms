import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Request, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IGetAllUserProfileByClientIdApplication } from 'src/features/user_profile/application/get-all-user-profile-by-client-id/get-all-user-profile-by-client-id-app.interface';
import { IGetUserProfileByIdApplication } from 'src/features/user_profile/application/get-user-profile-by-id-populate/get-user-profile-by-id-app.interface';
import { IUpdateUserApplication } from 'src/features/user_profile/application/update-user/update-user-app.interface';
import { IValidateUserApplication } from 'src/features/user_profile/application/validate-user/validate-user-app.interface';
import { UpdateUserProfileDto } from 'src/features/user_profile/infrastructure/dtos/update-user.dto';
import { UserProfileTypes } from 'src/features/user_profile/user.types';

@ApiTags('user profile')
@Controller('user-profile')
export class UserProfileController {
  
  constructor( 
    @Inject(UserProfileTypes.APPLICATION.GET_USER_PROFILE_BY_ID)
    private readonly getUserProfileById: IGetUserProfileByIdApplication,
    @Inject(UserProfileTypes.APPLICATION.GET_ALL_USER_PROFILE_BY_CLIENT_ID)
    private readonly getAllUserProfileByClientId: IGetAllUserProfileByClientIdApplication,
    @Inject(UserProfileTypes.APPLICATION.VALIDATE_USER)
    private readonly validateUser: IValidateUserApplication,
    @Inject(UserProfileTypes.APPLICATION.UPDATE_USER)
    private readonly updateUser: IUpdateUserApplication,
  ) {}
  
  @Get(':id')
  findByUserId(@Param('id') id: string) {
    return this.getUserProfileById.execute(id)
  }

  @Get('verify-user/:userIdentifier')
  verifyUser(@Param('userIdentifier') userIdentifier: string, @Request() request) {
    return this.validateUser.execute(userIdentifier, request)
  }

  @Get()
  findAllByClientId(@Request() req){
    return this.getAllUserProfileByClientId.execute(req)
  }

  //Acá entra con id de User,no de UserProfile
  @Put(':id')
  // Con UsePipes y Whitelist:true valida el DTO con PartialTypes y OmitTypes
  // Sin eso directamente te deja cambiar todos los params
  @UsePipes(new ValidationPipe({ 
    whitelist: true,
    forbidNonWhitelisted: true,
  }))
  update(@Param('id') id: string, @Body() updateUserProfileDto: UpdateUserProfileDto) {
    return this.updateUser.execute(id, updateUserProfileDto);
  }
}
