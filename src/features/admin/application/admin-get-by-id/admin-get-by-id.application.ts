import { Inject, Injectable } from "@nestjs/common";
import { AdminTypes } from "../../admin.types";
import { Admin } from "../../domain/entities/admin.entity";
import { IAdminRepository } from "../../infrastructure/repositories/admin-repository.interface";
import { IGetAdminByIdApplication } from "./admin-get-by-id.app.interface";

@Injectable()
export class GetAdminByIdApplication implements IGetAdminByIdApplication {
    constructor(
        @Inject(AdminTypes.INFRASTRUCTURE.REPOSITORY)
        private readonly AdminRepository: IAdminRepository,
    ) {}

    public execute(id: string): Promise<Admin> {
        return this.AdminRepository.findById(id)
    }
}
