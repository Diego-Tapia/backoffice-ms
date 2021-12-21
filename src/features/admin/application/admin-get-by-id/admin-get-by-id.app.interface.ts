import { Admin } from "../../domain/entities/admin.entity";
import { RequestModel } from "../../infrastructure/service/middleware/admin.middleware";

export interface IGetAdminByIdApplication {
    execute(id: string): Promise<Admin>
}
