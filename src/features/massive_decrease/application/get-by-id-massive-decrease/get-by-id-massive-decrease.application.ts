import { Inject, Injectable } from '@nestjs/common';
import { MassiveDecrease } from '../../domain/entities/massive-decrease.entity';
import { IMassiveDecreaseRepository } from '../../infrastructure/repositories/massive-decrease-repository.interface';
import { MassiveDecreaseTypes } from '../../massive-decrease.types';

@Injectable()
export class GetByIdMassiveDecreaseApplication {
  constructor(
    @Inject(MassiveDecreaseTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly massiveDecreaseRepository: IMassiveDecreaseRepository,
  ) {}

  public execute(id: string): Promise<MassiveDecrease> {
    return this.massiveDecreaseRepository.findById(id);
  }
}
