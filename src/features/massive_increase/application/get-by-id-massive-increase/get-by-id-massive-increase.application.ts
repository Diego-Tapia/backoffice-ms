import { Inject, Injectable } from '@nestjs/common';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { MassiveIncrease } from '../../domain/entities/massive-increase.entity';
import { IMassiveIncreaseRepository } from '../../infrastructure/repositories/massive-increase-repository.interface';
import { MassiveIncreaseTypes } from '../../massive-increase.types';

@Injectable()
export class GetByIdMassiveIncreaseApplication {
  constructor(
    @Inject(MassiveIncreaseTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly massiveIncreaseRepository: IMassiveIncreaseRepository,
  ) {}

  public execute(id: string): Promise<MassiveIncrease> {
    return this.massiveIncreaseRepository.findById(id);
  }
}
