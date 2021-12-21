import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { AdminController } from "src/api/admin/admin.controller";
import configs from "src/configs/environments/configs";
import { AdminConfirmProvider } from "./application/admin-confirm/admin-confirm.provider";
import { GetAdminByClientIdApplicationProvider } from "./application/admin-get-by-client-id/admin-get-by-client-id.provider";
import { GetAdminByIdApplicationProvider } from "./application/admin-get-by-id/admin-get-by-id.provider";
import { AdminLoginProvider } from "./application/admin-login/admin-login.provider";
import { AdminRegisterProvider } from "./application/admin-register/admin-register.provider";
import { AdminModel, AdminSchema } from "./infrastructure/models/admin.model";
import { AdminRepositoryProvider } from "./infrastructure/repositories/admin-repository.provider";
import { JwtStrategy } from "./infrastructure/service/jwt.strategy";

@Module({
    imports: [
      ConfigModule.forRoot({
        load: [configs],
        isGlobal: true,
      }),
      MongooseModule.forFeature([{ name: AdminModel.name, schema: AdminSchema }]),
      PassportModule,
      JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory:( config: ConfigService) => {
          return {
            secret: process.env.SECRET,
            signOptions: { expiresIn: '3600s' },
           }
        }
      })
      
    ],
    providers: [
      JwtStrategy,
      AdminRepositoryProvider,
      AdminLoginProvider,
      AdminRegisterProvider,
      AdminConfirmProvider,
      GetAdminByClientIdApplicationProvider,
      GetAdminByIdApplicationProvider,
    ],
    controllers: [AdminController],
    exports: [AdminRepositoryProvider],
  })
  export class AdminFeatureModule {}
