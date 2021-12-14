import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { IndividualIncrementDto } from '../../infrastructure/dtos/individual-increment.dto';

export interface IIndividualIncrementApplication {
  execute(individualIncrementDto: IndividualIncrementDto, request: RequestModel);
}
