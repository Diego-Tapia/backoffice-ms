import { Inject, Injectable } from '@nestjs/common';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { MassiveIncrease } from '../../domain/entities/massive-increase.entity';
import { IMassiveIncreaseRepository } from '../../infrastructure/repositories/massive-increase-repository.interface';
import { MassiveIncreaseTypes } from '../../massive-increase.types';

@Injectable()
export class GetAllMassiveIncreaseApplication {
  constructor(
    @Inject(MassiveIncreaseTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly massiveIncreaseRepository: IMassiveIncreaseRepository,
  ) {}

  public execute(req: RequestModel): Promise<MassiveIncrease[]> {
    const { clientId } = req.admin;
    return this.massiveIncreaseRepository.findAll({ clientId });
  }
}
