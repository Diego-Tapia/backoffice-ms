import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/api/user/user.controller';
import { GetAllUsersApplicationProvider } from '../user_profile/application/get-all-user/get-all-users.provider';
import { UserProfileModel, UserProfileSchema } from '../user_profile/infrastructure/model/user-profile.model';
import { UserProfileRepositoryProvider } from '../user_profile/infrastructure/repositories/user-repository.provider';
import { UserGetByIdProvider } from '../user/application/user-get-by-id/user-get-by-id.provider';
import { UserRegistrerProvider } from './application/user-register/user-register.provider';
import { UserModel, UserSchema } from './infrastructure/models/user.model';
import { UserRepositoryProvider } from './infrastructure/repositories/user-repository.provider';
import { UserGetAllByClientIdProvider } from './application/user-get-all-by-client-id/user-get-all-by-client-id.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema },{ name: UserProfileModel.name, schema: UserProfileSchema }]),
  ],
  providers: [
    UserProfileRepositoryProvider,
    UserRepositoryProvider,
    UserRegistrerProvider,
    UserGetAllByClientIdProvider,
    UserGetByIdProvider,
  ],
  controllers: [UserController],
  exports: [UserRepositoryProvider,UserProfileRepositoryProvider],
})
export class UserFeatureModule {}
