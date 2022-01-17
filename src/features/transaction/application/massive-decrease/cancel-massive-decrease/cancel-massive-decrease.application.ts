import { BadRequestException, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IMassiveDecreaseRepository } from '../../../infrastructure/repositories/massive-decrease/massive-decrease-repository.interface';
import { ICancelMassiveDecreaseApplication } from './cancel-massive-decrease-app.interface';
import { TransactionTypes } from 'src/features/transaction/transaction.types';
import { CreateMassiveDto } from 'src/features/transaction/infrastructure/dtos/create-massive.dto';
import { EMassiveStatus } from 'src/features/transaction/domain/enums/massive-status.enum';

export class CancelMassiveDecreaseApplication implements ICancelMassiveDecreaseApplication {
  constructor(
    @Inject(TransactionTypes.INFRASTRUCTURE.MASSIVE_DECREASE_REPOSITORY)
    private readonly massiveDecreaseRepository: IMassiveDecreaseRepository,
  ) {}

  async execute(createMassiveDto: CreateMassiveDto) {
    const { massiveId } = createMassiveDto;

    try {
      const massiveDecrease = await this.massiveDecreaseRepository.findById(massiveId);
      if (massiveDecrease.status === EMassiveStatus.CREATED || massiveDecrease.status === EMassiveStatus.READY_PROCESS) {
        return this.massiveDecreaseRepository.update({ _id: massiveId }, { status: EMassiveStatus.CANCEL});
      }
      throw new BadRequestException(`the status of the massive decrease should be ${ EMassiveStatus.READY_PROCESS} or ${EMassiveStatus.CREATED }`);
    } catch (error) {
      throw new HttpException(error.message || 'Server error in Cancel Massive Decrease Application', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
