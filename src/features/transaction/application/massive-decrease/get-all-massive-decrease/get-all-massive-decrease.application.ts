import { Inject, Injectable } from '@nestjs/common';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { Massive } from 'src/features/transaction/domain/entities/massive.entity';
import { TransactionTypes } from 'src/features/transaction/transaction.types';
import { IMassiveDecreaseRepository } from '../../../infrastructure/repositories/massive-decrease/massive-decrease-repository.interface';

@Injectable()
export class GetAllMassiveDecreaseApplication {
  constructor(
    @Inject(TransactionTypes.INFRASTRUCTURE.MASSIVE_DECREASE_REPOSITORY)
    private readonly massiveDecreaseRepository: IMassiveDecreaseRepository,
  ) {}

  public execute(req: RequestModel): Promise<Massive[]> {
    const { clientId } = req.admin;
    return this.massiveDecreaseRepository.findAll({ clientId });
  }
}
