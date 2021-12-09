import { BadRequestException, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IMassiveDecreaseRepository } from '../../infrastructure/repositories/massive-decrease-repository.interface';
import { MassiveDecreaseTypes } from '../../massive-decrease.types';
import { MassiveDecreaseDto } from '../../infrastructure/dtos/massive-decrease.dto';
import { EMassiveDecreaseStatus } from '../../domain/enums/massive-decrease-status.enum';
import { ICancelMassiveDecreaseApplication } from './cancel-massive-decrease-app.interface';

export class CancelMassiveDecreaseApplication implements ICancelMassiveDecreaseApplication {
  constructor(
    @Inject(MassiveDecreaseTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly massiveDecreaseRepository: IMassiveDecreaseRepository,
  ) {}

  async execute(massiveDecreaseDto: MassiveDecreaseDto) {
    const { massiveDecreaseId } = massiveDecreaseDto;

    try {
      const massiveDecrease = await this.massiveDecreaseRepository.findById(massiveDecreaseId);
      if (massiveDecrease.status === EMassiveDecreaseStatus.CREATED || massiveDecrease.status === EMassiveDecreaseStatus.READY_PROCESS) {
        return this.massiveDecreaseRepository.update(massiveDecreaseId, { status: EMassiveDecreaseStatus.CANCEL});
      }
      throw new BadRequestException(`the status of the massive decrease should be ${ EMassiveDecreaseStatus.READY_PROCESS} or ${EMassiveDecreaseStatus.CREATED }`);
    } catch (error) {
      throw new HttpException(error.message || 'Server error in Cancel Massive Decrease Application', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
