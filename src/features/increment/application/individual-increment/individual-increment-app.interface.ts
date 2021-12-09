import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { Transaction } from 'src/features/transaction/domain/entities/transaction.entity';
import { IndividualIncrementDto } from '../../infrastructure/dtos/individual-increment.dto';

export interface IIndividualIncrementApplication {
  execute(individualIncrementDto: IndividualIncrementDto, request: RequestModel): Promise<Transaction>;
}
