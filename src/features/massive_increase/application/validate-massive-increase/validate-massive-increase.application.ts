import { BadRequestException, Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { MassiveIncrease } from '../../domain/entities/massive-increase.entity';
import { MassiveIncreaseDetail } from '../../domain/entities/massive.increase-detail.entity';
import { EMassiveIncreaseStatus } from '../../domain/enums/massive-increase-status.enum';
import { EMassiveIncreaseDetailStatus } from '../../domain/enums/massive.increase-detail-status.enum';
import { IMassiveIncreaseRepository } from '../../infrastructure/repositories/massive-increase-repository.interface';
import { MassiveIncreaseTypes } from '../../massive-increase.types';
import { IValidateMassiveIncreaseApplication } from './validate-massive-increase-app.interface';

export class ValidateMassiveIncreaseApplication implements IValidateMassiveIncreaseApplication {
  constructor(
    @Inject(MassiveIncreaseTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly massiveIncreaseRepository: IMassiveIncreaseRepository,
  ) {}

  async execute(massiveIncrease: MassiveIncrease) {
    const { id } = massiveIncrease;

    if (massiveIncrease.status !== EMassiveIncreaseStatus.CREATED) throw new BadRequestException(`the status of the massive increase should be  ${ EMassiveIncreaseStatus.CREATED }`);
    
    massiveIncrease.recordLengthTotal = massiveIncrease.detail.length
    massiveIncrease.recordLengthValidatedOk = 0;
    massiveIncrease.recordLengthValidatedError = 0
    massiveIncrease.totalAmountValidated = 0
    massiveIncrease.recordLengthExecutedError = 0;
    massiveIncrease.recordLengthExecutedOk = 0;
    massiveIncrease.totalAmountExecuted = 0;

    this.validateDetailsAndSetStatus(massiveIncrease.detail, (detail: MassiveIncreaseDetail) => {
      if (detail.status === EMassiveIncreaseDetailStatus.VALID) {
        massiveIncrease.recordLengthValidatedOk++
        massiveIncrease.totalAmountValidated += detail.amount
      } else {
        massiveIncrease.recordLengthValidatedError++
      }
    })

    massiveIncrease.status = (massiveIncrease.recordLengthValidatedOk) 
      ? EMassiveIncreaseStatus.READY_PROCESS
      : EMassiveIncreaseStatus.INVALID; 
    return this.massiveIncreaseRepository.update(id, massiveIncrease)
  }


  private validateDetailsAndSetStatus(details: MassiveIncreaseDetail[], callback: Function) {
    details.forEach(detail => {
      detail.error = [];
      detail.error = detail.error
        .concat(this.validateIdAndSetErrorMessage(detail))
        .concat(this.validateAmountAndSetErrorMessage(detail))
        .concat(this.validateNoteAndSetErrorMessage(detail))
      detail.status = (detail.error.length > 0) 
        ? EMassiveIncreaseDetailStatus.INVALID 
        : EMassiveIncreaseDetailStatus.VALID;
      callback(detail)
    })
  }

  private validateIdAndSetErrorMessage = (detail: MassiveIncreaseDetail): string[] => {
    const errorMessage: string[] = [];
    if (!detail.userId) errorMessage.push('Se debe proporcionar un identificador de usuario');
    if(typeof detail.userId === 'string' && detail.userId.match(new RegExp(/^([0-9]{2}-[0-9]{8}-[0-9]{1})$/g))) {
      detail.userId =  Number(detail.userId.split('-').join(''));
    }
    return errorMessage;
  }

  private validateAmountAndSetErrorMessage = (detail: MassiveIncreaseDetail): string[] => {
    const errorMessage: string[] = [];
    if (!detail.amount) errorMessage.push('Se debe proporcionar un monto');
    if (typeof detail.amount !== 'number' ) errorMessage.push('El valor del monto debe ser un número');
    if (detail.amount < 0) errorMessage.push('El monto debe ser un número mayor a cero');
    return errorMessage;
  }

  private validateNoteAndSetErrorMessage = (detail: MassiveIncreaseDetail): string[] => {
    const errorMessage: string[] = [];
    if (detail.note && detail.note.length > 256) errorMessage.push('La nota no puede contener más de 256 caracteres');
    return errorMessage;
  }

}