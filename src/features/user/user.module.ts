import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/api/user/user.controller';
import { UserProfileModel, UserProfileSchema } from './infrastructure/models/user-profile.model';
import { UserModel, UserSchema } from './infrastructure/models/user.model';
import { WalletFeatureModule } from '../wallet/wallet.module';
import { ValidateUserApplicationProvider } from './application/validate-user/validate-user.provider';
import { UpdateUserApplicationProvider } from './application/update-user/update-user.provider';
import { UserRepositoryProvider } from './infrastructure/repositories/user/user-repository.provider';
import { UserProfileRepositoryProvider } from './infrastructure/repositories/user-profile/user-profile-repository.provider';
import { RegistrerUserApplicationProvider } from './application/register-user/register-user.provider';
import { GetUserByIdApplicationProvider } from './application/get-user-by-id/get-user-by-id.provider';
import { GetAllUserApplicationProvider } from './application/get-all-user/get-all-user.provider';

@Module({
  controllers: [UserController],
  imports: [
    WalletFeatureModule,
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: UserProfileModel.name, schema: UserProfileSchema }]),
  ],
  providers: [
    UserRepositoryProvider,
    UserProfileRepositoryProvider,
    RegistrerUserApplicationProvider,
    ValidateUserApplicationProvider,
    UpdateUserApplicationProvider,
    GetUserByIdApplicationProvider,
    GetAllUserApplicationProvider,
  ],
  exports: [
    UserRepositoryProvider,
    UserProfileRepositoryProvider,
    ValidateUserApplicationProvider,
  ],
})
export class UserFeatureModule {}