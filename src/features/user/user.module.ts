import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/api/user/user.controller';
import { UserProfileModel, UserProfileSchema } from '../user_profile/infrastructure/model/user-profile.model';
import { UserProfileRepositoryProvider } from '../user_profile/infrastructure/repositories/user-repository.provider';
import { UserRegistrerProvider } from './application/user-register/user-register.provider';
import { UserModel, UserSchema } from './infrastructure/models/user.model';
import { UserRepositoryProvider } from './infrastructure/repositories/user-repository.provider';
import { WalletFeatureModule } from '../wallet/wallet.module';

@Module({
  imports: [
    WalletFeatureModule,
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema },{ name: UserProfileModel.name, schema: UserProfileSchema }]),
  ],
  providers: [
    UserProfileRepositoryProvider,
    UserRepositoryProvider,
    UserRegistrerProvider,
  ],
  controllers: [UserController],
  exports: [UserRepositoryProvider,UserProfileRepositoryProvider],
})
export class UserFeatureModule {}