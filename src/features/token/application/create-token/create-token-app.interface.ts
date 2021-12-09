
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { Token } from '../../domain/entities/token.entity';
import { CreateTokenDto } from '../../infrastructure/dtos/create-token.dto';

export interface ICreateTokenApplication {
  execute(createTokenDto: CreateTokenDto, req: RequestModel): Promise<Token>;
}
