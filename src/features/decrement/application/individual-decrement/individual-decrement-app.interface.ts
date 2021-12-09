import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { Transaction } from 'src/features/transaction/domain/entities/transaction.entity';
import { IndividualDecrementDto } from '../../infrastructure/dtos/individual-decrement.dto';

export interface IIndividualDecrementApplication {
  execute(individualDecrementDto: IndividualDecrementDto, request: RequestModel): Promise<Transaction>;
}
