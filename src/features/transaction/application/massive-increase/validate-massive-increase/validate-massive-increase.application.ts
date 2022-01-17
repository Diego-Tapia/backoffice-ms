import { BadRequestException, Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UserTypes } from 'src/features/user/user.types';
import { IMassiveIncreaseRepository } from '../../../infrastructure/repositories/massive-increase/massive-increase-repository.interface';
import { IValidateMassiveIncreaseApplication } from './validate-massive-increase-app.interface';
import { IValidateUserApplication } from 'src/features/user/application/validate-user/validate-user-app.interface';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { TransactionTypes } from 'src/features/transaction/transaction.types';
import { EMassiveStatus } from 'src/features/transaction/domain/enums/massive-status.enum';
import { EMassiveDetailStatus } from 'src/features/transaction/domain/enums/massive-detail-status.enum';
import { Massive } from 'src/features/transaction/domain/entities/massive.entity';
import { MassiveDetail } from 'src/features/transaction/domain/entities/massive-detail.entity';

export class ValidateMassiveIncreaseApplication implements IValidateMassiveIncreaseApplication {
  constructor(
    @Inject(TransactionTypes.INFRASTRUCTURE.MASSIVE_INCREASE_REPOSITORY)
    private readonly massiveIncreaseRepository: IMassiveIncreaseRepository,
    @Inject(UserTypes.APPLICATION.VALIDATE_USER)
    private readonly validateUserApplication: IValidateUserApplication
  ) {}

  async execute(massiveIncrease: Massive, req: RequestModel) {
    const { id } = massiveIncrease;

    if (massiveIncrease.status !== EMassiveStatus.CREATED) throw new BadRequestException(`the status of the massive increase should be  ${ EMassiveStatus.CREATED }`);
    
    massiveIncrease.recordLengthTotal = massiveIncrease.detail.length
    massiveIncrease.recordLengthValidatedOk = 0;
    massiveIncrease.recordLengthValidatedError = 0
    massiveIncrease.totalAmountValidated = 0
    massiveIncrease.recordLengthExecutedError = 0;
    massiveIncrease.recordLengthExecutedOk = 0;
    massiveIncrease.totalAmountExecuted = 0;

    await this.validateDetailsAndSetStatus(massiveIncrease.detail, req, (detail: MassiveDetail) => {
      if (detail.status === EMassiveDetailStatus.VALID) {
        massiveIncrease.recordLengthValidatedOk++
        massiveIncrease.totalAmountValidated += detail.amount
      } else {
        massiveIncrease.recordLengthValidatedError++
      }
    })

    massiveIncrease.status = (massiveIncrease.recordLengthValidatedOk) 
      ? EMassiveStatus.READY_PROCESS
      : EMassiveStatus.INVALID; 
    return this.massiveIncreaseRepository.update({_id: id}, massiveIncrease)
  }


  private async validateDetailsAndSetStatus(details: MassiveDetail[], req: RequestModel,callback: Function) {
    for (let detail of details ) {
      detail.error = [];
      detail.error = detail.error
        .concat(await this.validateUserAndSetErrorMessage(detail, req))
        .concat(this.validateAmountAndSetErrorMessage(detail))
        .concat(this.validateNoteAndSetErrorMessage(detail));

      detail.status = (detail.error.length > 0) 
        ? EMassiveDetailStatus.INVALID 
        : EMassiveDetailStatus.VALID;
      callback(detail)
    }
  }

  private async validateUserAndSetErrorMessage(detail: MassiveDetail, req: RequestModel): Promise<string[]> {
    try {
      if (!detail.userId) return ['Identificador de usuario invalido']
      
      const isCuil = String(detail.userId).match(new RegExp(/^([0-9]{2}-[0-9]{8}-[0-9]{1})$/g))
      if(isCuil) detail.userId =  Number(String(detail.userId).split('-').join(''));

      await this.validateUserApplication.execute(String(detail.userId), req)

    } catch (error) {
      return [error.message];
    } 
    return []
  }

  private validateAmountAndSetErrorMessage = (detail: MassiveDetail): string[] => {
    if (!detail.amount) return ['Se debe proporcionar un monto'];
    if (typeof detail.amount !== 'number' ) return ['El valor del monto debe ser un número'];
    if (detail.amount < 0) return ['El monto debe ser un número mayor a cero'];
    return [];
  }

  private validateNoteAndSetErrorMessage = (detail: MassiveDetail): string[] => {
    if (detail.note && detail.note.length > 256) return ['La nota no puede contener más de 256 caracteres'];
    return []
  }

}