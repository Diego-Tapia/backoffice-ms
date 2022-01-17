import { Inject, Injectable } from '@nestjs/common';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { Massive } from 'src/features/transaction/domain/entities/massive.entity';
import { TransactionTypes } from 'src/features/transaction/transaction.types';
import { IMassiveIncreaseRepository } from '../../../infrastructure/repositories/massive-increase/massive-increase-repository.interface';

@Injectable()
export class GetAllMassiveIncreaseApplication {
  constructor(
    @Inject(TransactionTypes.INFRASTRUCTURE.MASSIVE_INCREASE_REPOSITORY)
    private readonly massiveIncreaseRepository: IMassiveIncreaseRepository,
  ) {}

  public execute(req: RequestModel): Promise<Massive[]> {
    const { clientId } = req.admin;
    return this.massiveIncreaseRepository.findAll({ clientId });
  }
}
