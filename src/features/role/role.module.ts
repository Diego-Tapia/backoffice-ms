import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoleController } from "src/api/role/role.controller";
import { CreateRoleApplicationProvider } from "./application/create-role/create-role.provider";
import { GetAllRoleApplicationProvider } from "./application/get-all-role/get-all-role.provider";
import { RoleModel, RoleSchema } from "./infrastructure/models/role.model";
import { RoleRepositoryProvider } from "./infrastructure/repositories/role-repository.provider";

@Module({
    controllers: [
      RoleController
    ],
    imports: [
      MongooseModule.forFeature([{ name: RoleModel.name, schema: RoleSchema }])],
    providers: [
      RoleRepositoryProvider,
      GetAllRoleApplicationProvider,
      CreateRoleApplicationProvider
    ],
  })
  export class RoleFeatureModule {}
  