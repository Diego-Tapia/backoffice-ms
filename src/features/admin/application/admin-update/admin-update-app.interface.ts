import { Admin } from "../../domain/entities/admin.entity";
import { UpdateAdminDto } from "../../infrastructure/dto/update-admin.dto";
import { RequestModel } from "../../infrastructure/service/middleware/admin.middleware";

export interface IAdminUpdateApplication {
    execute(id: string, updateAdminDto: UpdateAdminDto,  request: RequestModel): Promise<Admin>
}