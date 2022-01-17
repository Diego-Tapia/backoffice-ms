import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { AdminTypes } from "../../admin.types";
import { UpdateAdminDto } from "../../infrastructure/dto/update-admin.dto";
import { IAdminRepository } from "../../infrastructure/repositories/admin-repository.interface";
import { RequestModel } from "../../infrastructure/service/middleware/admin.middleware";
import { IAdminUpdateApplication } from "./admin-update-app.interface";
import { Types } from 'mongoose'

@Injectable()
export class AdminUpdateApplication implements IAdminUpdateApplication {
    constructor(
        @Inject(AdminTypes.INFRASTRUCTURE.REPOSITORY)
        private readonly adminRepository: IAdminRepository,
    ) {}

    public async execute(id: string, updateAdminDto: UpdateAdminDto,  request: RequestModel) {

      const { clientId } = request.admin;
      
      try {
        const admin = await this.adminRepository.findById(id);

        if (!admin) throw new BadRequestException('El usuario admin no existe')

        if (clientId !== admin.clientId) {
          throw new BadRequestException('El usuario admin no existe');
      }

        return await this.adminRepository.update(id, updateAdminDto);
        
      } catch (error) {
        throw new HttpException(error.message || 'Error at getting user', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}