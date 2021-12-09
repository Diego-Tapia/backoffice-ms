import { BadRequestException, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IMassiveIncreaseRepository } from '../../infrastructure/repositories/massive-increase-repository.interface';
import { MassiveIncreaseTypes } from '../../massive-increase.types';
import { MassiveIncreaseDto } from '../../infrastructure/dtos/massive-increase.dto';
import { ICancelMassiveIncreaseApplication } from './cancel-massive-increase-app.interface';
import { EMassiveIncreaseStatus } from '../../domain/enums/massive-increase-status.enum';

export class CancelMassiveIncreaseApplication implements ICancelMassiveIncreaseApplication {
  constructor(
    @Inject(MassiveIncreaseTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly massiveIncreaseRepository: IMassiveIncreaseRepository,
  ) {}

  async execute(massiveIncreaseDto: MassiveIncreaseDto) {
    const { massiveIncreaseId } = massiveIncreaseDto;

    try {
      const massiveIncrease = await this.massiveIncreaseRepository.findById(massiveIncreaseId);
      if (massiveIncrease.status === EMassiveIncreaseStatus.CREATED || massiveIncrease.status === EMassiveIncreaseStatus.READY_PROCESS) {
        return this.massiveIncreaseRepository.update(massiveIncreaseId, { status: EMassiveIncreaseStatus.CANCEL});
      }
      throw new BadRequestException(`the status of the massive increase should be ${ EMassiveIncreaseStatus.READY_PROCESS } or ${ EMassiveIncreaseStatus.CREATED }`);
    } catch (error) {
      throw new HttpException(error.message || 'Server error in Cancel Massive Increase Application', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
