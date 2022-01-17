import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { CreateIndividualDto } from '../../infrastructure/dtos/create-individual.dto';

export interface IIndividualDecreaseApplication {
  execute(createIndividualDto: CreateIndividualDto, request: RequestModel);
}
