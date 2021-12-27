import { RequestModel } from "src/features/admin/infrastructure/service/middleware/admin.middleware";

export interface IEmitTokenApplication {
  execute(id: string, request: RequestModel): Promise<void>
}