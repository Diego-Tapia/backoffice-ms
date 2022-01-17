import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { Token } from '../../domain/entities/token.entity';

export interface IGetTokenApplication {
  execute(id: string, request: RequestModel): Promise<Token>;
}
