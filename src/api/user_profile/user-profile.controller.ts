import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IGetAllUserProfileByClientIdApplication } from 'src/features/user_profile/application/get-all-user-profile-by-client-id/get-all-user-profile-by-client-id-app.interface';
import { IGetUserProfileByIdApplication } from 'src/features/user_profile/application/get-user-profile-by-id-populate/get-user-profile-by-id-app.interface';
import { IValidateUserApplication } from 'src/features/user_profile/application/validate-user/validate-user-app.interface';
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
    private readonly validateUser: IValidateUserApplication
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
}
