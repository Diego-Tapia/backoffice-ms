import { BadRequestException, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IMassiveIncreaseRepository } from '../../../infrastructure/repositories/massive-increase/massive-increase-repository.interface';
import { ICancelMassiveIncreaseApplication } from './cancel-massive-increase-app.interface';
import { TransactionTypes } from 'src/features/transaction/transaction.types';
import { CreateMassiveDto } from 'src/features/transaction/infrastructure/dtos/create-massive.dto';
import { EMassiveStatus } from 'src/features/transaction/domain/enums/massive-status.enum';

export class CancelMassiveIncreaseApplication implements ICancelMassiveIncreaseApplication {
  constructor(
    @Inject(TransactionTypes.INFRASTRUCTURE.MASSIVE_INCREASE_REPOSITORY)
    private readonly massiveIncreaseRepository: IMassiveIncreaseRepository,
  ) {}

  async execute(createMassiveDto: CreateMassiveDto) {
    const { massiveId } = createMassiveDto;

    try {
      const massiveIncrease = await this.massiveIncreaseRepository.findById(massiveId);
      if (massiveIncrease.status === EMassiveStatus.CREATED || massiveIncrease.status === EMassiveStatus.READY_PROCESS) {
        return this.massiveIncreaseRepository.update({_id: massiveId}, { status: EMassiveStatus.CANCEL});
      }
      throw new BadRequestException(`the status of the massive increase should be ${ EMassiveStatus.READY_PROCESS } or ${ EMassiveStatus.CREATED }`);
    } catch (error) {
      throw new HttpException(error.message || 'Server error in Cancel Massive Increase Application', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
