import { Admin } from "../../domain/entities/admin.entity";
import { RequestModel } from "../../infrastructure/service/middleware/admin.middleware";

export interface IGetAdminByClientIdApplication {
    execute(req: RequestModel): Promise<Admin[]>
}
