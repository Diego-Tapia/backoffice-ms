import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { AdminTypes } from "../../admin.types";
import { UpdateAdminDto } from "../../infrastructure/dto/update-admin.dto";
import { IAdminRepository } from "../../infrastructure/repositories/admin-repository.interface";
import { RequestModel } from "../../infrastructure/service/middleware/admin.middleware";
import { IAdminUpdateApplication } from "./admin-update-app.interface";

@Injectable()
export class AdminUpdateApplication implements IAdminUpdateApplication {
    constructor(
        @Inject(AdminTypes.INFRASTRUCTURE.REPOSITORY)
        private readonly adminRepository: IAdminRepository,
    ) {}

    public async execute(id: string, updateAdminDto: UpdateAdminDto) {
      
      try {
        return this.adminRepository.update(id, updateAdminDto)
      } catch (error) {
        throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}