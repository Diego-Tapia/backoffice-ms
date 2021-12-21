import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './configs/database/database.module';
import configs from './configs/environments/configs';
import envValidations from './configs/environments/env.validations';
import { AdminFeatureModule } from './features/admin/admin.module';
import { AuthMiddleware } from './features/admin/infrastructure/service/middleware/admin.middleware';
import { ApplicabilityModule } from './features/applicability/applicability.module';
import { DecrementFeatureModule } from './features/individual_decrement/decrement.module';
import { IncrementFeatureModule } from './features/individual_increment/increment.module';
import { MassiveDecreaseFeatureModule } from './features/massive_decrease/massive-decrease.module';
import { MassiveIncreaseFeatureModule } from './features/massive_increase/massive-increase.module';
import { RoleFeatureModule } from './features/role/role.module';
import { TokenFeatureModule } from './features/token/token.module';
import { TransactionTypeFeatureModule } from './features/transaction_type/transaction-type.module';
import { UserFeatureModule } from './features/user/user.module';
import { UserProfileFeatureModule } from './features/user_profile/user.module';
import { WalletsByClientsFeatureModule } from './features/wallestByClients/walletsByClients.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configs],
      isGlobal: true,
      validationSchema: envValidations,
    }),
    TokenFeatureModule,
    DatabaseModule,
    AdminFeatureModule,
    UserFeatureModule,
    MassiveIncreaseFeatureModule,
    MassiveDecreaseFeatureModule,
    IncrementFeatureModule,
    DecrementFeatureModule,
    WalletsByClientsFeatureModule,
    TransactionTypeFeatureModule,
    ApplicabilityModule,
    RoleFeatureModule

  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'api/admin/register', method: RequestMethod.POST },
        { path: 'api/admin/confirm', method: RequestMethod.POST },
        { path: 'api/admin/login', method: RequestMethod.POST },
      )
      .forRoutes('*')
  }
}
