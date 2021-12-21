import { Inject, Injectable } from "@nestjs/common";
import { Role } from "../../domain/entities/role.entity";
import { RoleDto } from "../../infrastructure/dtos/role.dto";
import { IRoleRepository } from "../../infrastructure/repositories/role-repository.interface";
import { RoleTypes } from "../../role.types";
import { ICreateRoleApplication } from "./create-role.app.interface";

@Injectable()
export class CreateRoleApplication implements ICreateRoleApplication {
    constructor(
        @Inject(RoleTypes.INFRASTRUCTURE.REPOSITORY)
        private readonly roleRepository: IRoleRepository,
    ) { }

    public async execute(roleDto: RoleDto): Promise<Role> {
        return await this.roleRepository.create(roleDto);
    }
}