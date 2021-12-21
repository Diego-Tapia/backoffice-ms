import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ICreateRoleApplication } from "src/features/role/application/create-role/create-role.app.interface";
import { IGetAllRoleApplication } from "src/features/role/application/get-all-role/get-all-role.app.interface";
import { RoleDto } from "src/features/role/infrastructure/dtos/role.dto";
import { RoleTypes } from "src/features/role/role.types";

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(
    @Inject(RoleTypes.APPLICATION.GET_ALL)
    private readonly getAllRoleApplication: IGetAllRoleApplication,
    @Inject(RoleTypes.APPLICATION.CREATE)
    private readonly createRoleApplication: ICreateRoleApplication,
  ) {}

  @Get()
  findAll() {
    return this.getAllRoleApplication.execute();
  }
  @Post()
  create(@Body() roleDto: RoleDto) {
    return this.createRoleApplication.execute(roleDto);
  }
}
