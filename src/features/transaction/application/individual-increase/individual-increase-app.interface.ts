import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { CreateIndividualDto } from '../../infrastructure/dtos/create-individual.dto';

export interface IIndividualIncreaseApplication {
  execute(createIndividualDto: CreateIndividualDto, request: RequestModel);
}
