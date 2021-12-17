import { Inject, Injectable } from '@nestjs/common';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { MassiveDecrease } from '../../domain/entities/massive-decrease.entity';
import { IMassiveDecreaseRepository } from '../../infrastructure/repositories/massive-decrease-repository.interface';
import { MassiveDecreaseTypes } from '../../massive-decrease.types';

@Injectable()
export class GetAllMassiveDecreaseApplication {
  constructor(
    @Inject(MassiveDecreaseTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly massiveDecreaseRepository: IMassiveDecreaseRepository,
  ) {}

  public execute(req: RequestModel): Promise<MassiveDecrease[]> {
    const { clientId } = req.admin;
    return this.massiveDecreaseRepository.findAll({ clientId });
  }
}
