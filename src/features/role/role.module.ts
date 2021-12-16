import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoleModel, RoleSchema } from "./infrastructure/models/role.model";

@Module({
    imports: [
      MongooseModule.forFeature([{ name: RoleModel.name, schema: RoleSchema }])],
    providers: [
    ],
    exports: [
    ]
  })
  export class RoleFeatureModule {}
  