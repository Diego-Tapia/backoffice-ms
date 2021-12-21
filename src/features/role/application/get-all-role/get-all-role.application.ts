import { Inject, Injectable } from "@nestjs/common";
import { Role } from "../../domain/entities/role.entity";
import { IRoleRepository } from "../../infrastructure/repositories/role-repository.interface";
import { RoleTypes } from "../../role.types";
import { IGetAllRoleApplication } from "./get-all-role.app.interface";

@Injectable()
export class GetAllRoleApplication implements IGetAllRoleApplication {
    constructor(
        @Inject(RoleTypes.INFRASTRUCTURE.REPOSITORY)
        private readonly roleRepository: IRoleRepository,
    ) { }

    public async execute(): Promise<Role[]> {
        return await this.roleRepository.findAll();
    }
}