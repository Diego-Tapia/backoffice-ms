import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserApplicationProvider } from './application/create-user/create-user.provider';
import { GetAllUsersApplicationProvider } from './application/get-all-user/get-all-users.provider';
import { GetUserByIdApplicationProvider } from './application/get-user-by-id/get-user-by-id.provider';
import { UserProfileRepositoryProvider } from './infrastructure/repositories/user-repository.provider';
import { UserProfileModel, UserProfileSchema } from './infrastructure/model/user-profile.model';
import { UserProfileController } from 'src/api/user_profile/user-profile.controller';
import { GetUserProfileByIdApplicationProvider } from './application/get-user-profile-by-id-populate/get-user-profile-by-id.provider';
import { GetAllUserProfileByClientIdApplicationProvider } from './application/get-all-user-profile-by-client-id/get-all-user-profile-by-client-id.provider';

@Module({
  controllers: [
    UserProfileController
  ],
  imports: [
    MongooseModule.forFeature([{ name: UserProfileModel.name, schema: UserProfileSchema }])
  ],
  providers: [
    UserProfileRepositoryProvider,
    CreateUserApplicationProvider,
    GetAllUsersApplicationProvider,
    GetUserByIdApplicationProvider,
    GetUserProfileByIdApplicationProvider,
    GetAllUserProfileByClientIdApplicationProvider
  ],
})
export class UserProfileFeatureModule {}
