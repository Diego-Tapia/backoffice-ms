import { BadRequestException, Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UserTypes } from 'src/features/user/user.types';
import { MassiveIncrease } from '../../domain/entities/massive-increase.entity';
import { MassiveIncreaseDetail } from '../../domain/entities/massive.increase-detail.entity';
import { EMassiveIncreaseStatus } from '../../domain/enums/massive-increase-status.enum';
import { EMassiveIncreaseDetailStatus } from '../../domain/enums/massive.increase-detail-status.enum';
import { IMassiveIncreaseRepository } from '../../infrastructure/repositories/massive-increase-repository.interface';
import { MassiveIncreaseTypes } from '../../massive-increase.types';
import { IValidateMassiveIncreaseApplication } from './validate-massive-increase-app.interface';
import { IValidateUserApplication } from 'src/features/user/application/validate-user/validate-user-app.interface';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';

export class ValidateMassiveIncreaseApplication implements IValidateMassiveIncreaseApplication {
  constructor(
    @Inject(MassiveIncreaseTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly massiveIncreaseRepository: IMassiveIncreaseRepository,
    @Inject(UserTypes.APPLICATION.VALIDATE_USER)
    private readonly validateUserApplication: IValidateUserApplication
  ) {}

  async execute(massiveIncrease: MassiveIncrease, req: RequestModel) {
    const { id } = massiveIncrease;

    if (massiveIncrease.status !== EMassiveIncreaseStatus.CREATED) throw new BadRequestException(`the status of the massive increase should be  ${ EMassiveIncreaseStatus.CREATED }`);
    
    massiveIncrease.recordLengthTotal = massiveIncrease.detail.length
    massiveIncrease.recordLengthValidatedOk = 0;
    massiveIncrease.recordLengthValidatedError = 0
    massiveIncrease.totalAmountValidated = 0
    massiveIncrease.recordLengthExecutedError = 0;
    massiveIncrease.recordLengthExecutedOk = 0;
    massiveIncrease.totalAmountExecuted = 0;

    await this.validateDetailsAndSetStatus(massiveIncrease.detail, req, (detail: MassiveIncreaseDetail) => {
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


  private async validateDetailsAndSetStatus(details: MassiveIncreaseDetail[], req: RequestModel,callback: Function) {
    for (let detail of details ) {
      detail.error = [];
      detail.error = detail.error
        .concat(await this.validateUserAndSetErrorMessage(detail, req))
        .concat(this.validateAmountAndSetErrorMessage(detail))
        .concat(this.validateNoteAndSetErrorMessage(detail));

      detail.status = (detail.error.length > 0) 
        ? EMassiveIncreaseDetailStatus.INVALID 
        : EMassiveIncreaseDetailStatus.VALID;
      callback(detail)
    }
  }

  private async validateUserAndSetErrorMessage(detail: MassiveIncreaseDetail, req: RequestModel): Promise<string[]> {
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

  private validateAmountAndSetErrorMessage = (detail: MassiveIncreaseDetail): string[] => {
    if (!detail.amount) return ['Se debe proporcionar un monto'];
    if (typeof detail.amount !== 'number' ) return ['El valor del monto debe ser un número'];
    if (detail.amount < 0) return ['El monto debe ser un número mayor a cero'];
    return [];
  }

  private validateNoteAndSetErrorMessage = (detail: MassiveIncreaseDetail): string[] => {
    if (detail.note && detail.note.length > 256) return ['La nota no puede contener más de 256 caracteres'];
    return []
  }

}