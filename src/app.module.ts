import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './configs/database/database.module';
import configs from './configs/environments/configs';
import envValidations from './configs/environments/env.validations';
import { AdminFeatureModule } from './features/admin/admin.module';
import { AuthMiddleware } from './features/admin/infrastructure/service/middleware/admin.middleware';
import { ApplicabilityModule } from './features/applicability/applicability.module';
import { RoleFeatureModule } from './features/role/role.module';
import { TokenFeatureModule } from './features/token/token.module';
import { TransactionFeatureModule } from './features/transaction/transaction.module';
import { UserFeatureModule } from './features/user/user.module';
import { WalletsByClientsFeatureModule } from './features/wallestByClients/walletsByclients.module';
import { WalletFeatureModule } from './features/wallet/wallet.module';

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
    WalletFeatureModule,
    TransactionFeatureModule,
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
