import { Inject, Injectable } from "@nestjs/common";
import { AdminTypes } from "../../admin.types";
import { Admin } from "../../domain/entities/admin.entity";
import { IAdminRepository } from "../../infrastructure/repositories/admin-repository.interface";
import { RequestModel } from "../../infrastructure/service/middleware/admin.middleware";
import { IGetAdminByClientIdApplication } from './admin-get-by-client-id.app.interface'

@Injectable()
export class GetAdminByClientIdApplication implements IGetAdminByClientIdApplication {
    constructor(
        @Inject(AdminTypes.INFRASTRUCTURE.REPOSITORY)
        private readonly AdminRepository: IAdminRepository,
    ) {}

    public execute(req: RequestModel): Promise<Admin[]> {
        const { clientId } = req.admin;
        return this.AdminRepository.findAll({ clientId })
    }
}
