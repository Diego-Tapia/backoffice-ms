import { RequestModel } from "src/features/admin/infrastructure/service/middleware/admin.middleware";
import { IGetBalances } from "../../domain/interfaces/getbalances.interface";

export interface IGetAllBalancesApplication {
    execute(req: RequestModel): Promise<IGetBalances>;
}