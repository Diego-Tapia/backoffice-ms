import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { AdminController } from "src/api/admin/admin.controller";
import { AdminTypes } from "../../admin.types";
import { Admin } from "../../domain/entities/admin.entity";
import { IAdminRepository } from "../../infrastructure/repositories/admin-repository.interface";
import { RequestModel } from "../../infrastructure/service/middleware/admin.middleware";
import { IGetAdminByIdApplication } from "./admin-get-by-id.app.interface";
import { Types } from 'mongoose'


@Injectable()
export class GetAdminByIdApplication implements IGetAdminByIdApplication {
    constructor(
        @Inject(AdminTypes.INFRASTRUCTURE.REPOSITORY)
        private readonly AdminRepository: IAdminRepository,
    ) {}

    public async execute(id: string, request: RequestModel): Promise<Admin> {
        const { clientId } = request.admin;

        try{
            const admin = await this.AdminRepository.findById(id);
            if (!admin) throw new BadRequestException('El usuario admin no existe');
    
            if (clientId !== admin.clientId) {
                throw new BadRequestException('El usuario admin no existe');
            }
            return admin;
        } catch (error) {
            throw new HttpException(error.message || 'Error at getting user', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
