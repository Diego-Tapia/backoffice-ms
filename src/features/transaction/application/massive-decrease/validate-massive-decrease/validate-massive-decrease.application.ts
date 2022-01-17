import { BadRequestException, Inject } from '@nestjs/common';
import { User } from 'src/features/user/domain/entities/user.entity';
import { UserTypes } from 'src/features/user/user.types';
import { IWalletRepository } from 'src/features/wallet/infrastructure/repositories/wallet-repository.interface';
import { WalletTypes } from 'src/features/wallet/wallet.type';
import { IMassiveDecreaseRepository } from '../../../infrastructure/repositories/massive-decrease/massive-decrease-repository.interface';
import { IValidateMassiveDecreaseApplication } from './validate-massive-decrease-app.interface';
import { IValidateUserApplication } from 'src/features/user/application/validate-user/validate-user-app.interface';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { TransactionTypes } from 'src/features/transaction/transaction.types';
import { EMassiveStatus } from 'src/features/transaction/domain/enums/massive-status.enum';
import { EMassiveDetailStatus } from 'src/features/transaction/domain/enums/massive-detail-status.enum';
import { Massive } from 'src/features/transaction/domain/entities/massive.entity';
import { MassiveDetail } from 'src/features/transaction/domain/entities/massive-detail.entity';

export class ValidateMassiveDecreaseApplication implements IValidateMassiveDecreaseApplication {
  constructor(
    @Inject(TransactionTypes.INFRASTRUCTURE.MASSIVE_DECREASE_REPOSITORY)
    private readonly massiveDecreaseRepository: IMassiveDecreaseRepository,
    @Inject(WalletTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletRepository: IWalletRepository,
    @Inject(UserTypes.APPLICATION.VALIDATE_USER)
    private readonly validateUserApplication: IValidateUserApplication,
  ) {}

  async execute(massiveDecrease: Massive, req: RequestModel) {
    const { id } = massiveDecrease;

    if (massiveDecrease.status !== EMassiveStatus.CREATED) throw new BadRequestException(`the status of the massive decrease should be  ${ EMassiveStatus.CREATED }`);
    
    massiveDecrease.recordLengthTotal = massiveDecrease.detail.length
    massiveDecrease.recordLengthValidatedOk = 0;
    massiveDecrease.recordLengthValidatedError = 0
    massiveDecrease.totalAmountValidated = 0
    massiveDecrease.recordLengthExecutedError = 0;
    massiveDecrease.recordLengthExecutedOk = 0;
    massiveDecrease.totalAmountExecuted = 0;

    await this.validateDetailsAndSetStatus(massiveDecrease, req, (detail: MassiveDetail) => {
      if (detail.status === EMassiveDetailStatus.VALID) {
        massiveDecrease.recordLengthValidatedOk++
        massiveDecrease.totalAmountValidated += detail.amount
      } else {
        massiveDecrease.recordLengthValidatedError++
      }
    })

    massiveDecrease.status = (massiveDecrease.recordLengthValidatedOk) 
      ? EMassiveStatus.READY_PROCESS
      : EMassiveStatus.INVALID;
    return this.massiveDecreaseRepository.update({_id: id}, massiveDecrease)
  }


  private async validateDetailsAndSetStatus(massiveDecrease: Massive, req: RequestModel, callback: Function) {
    for (let detail of massiveDecrease.detail ){
      detail.error = [];
      
      detail.error = detail.error
        .concat(await this.validateIdAndSetErrorMessage(detail, req))
        .concat(this.validateAmountAndSetErrorMessage(detail))
        .concat(this.validateNoteAndSetErrorMessage(detail))

      if( detail.error.length === 0 ) {
        detail.error = detail.error
          .concat(await this.validateBalanceUserWalletAndSetErrorMessage(detail, massiveDecrease, req))
      }      
      
      detail.status = (detail.error.length > 0) 
        ? EMassiveDetailStatus.INVALID 
        : EMassiveDetailStatus.VALID;
      callback(detail)
    }
  }

  private validateIdAndSetErrorMessage = async (detail: MassiveDetail, req: RequestModel): Promise<string[]> => {
    try {
      if (!detail.userId) return ['Identificador de usuario invalido']
      
      const isCuil = String(detail.userId).match(new RegExp(/^([0-9]{2}-[0-9]{8}-[0-9]{1})$/g))
      if(isCuil) detail.userId =  Number(String(detail.userId).split('-').join(''));

      await this.validateUserApplication.execute(String(detail.userId), req)

    } catch (error) {
      return [error.message];
    }
    return [];
  }

  private validateAmountAndSetErrorMessage = (detail: MassiveDetail): string[] => {
    if (!detail.amount) return ['Se debe proporcionar un monto'];
    if (typeof detail.amount !== 'number' ) return ['El valor del monto debe ser un número'];
    if (detail.amount < 0) return ['El monto debe ser un número mayor a cero'];
    return []
  }

  private validateBalanceUserWalletAndSetErrorMessage = async (detail: MassiveDetail, massiveDecrease: Massive, req: RequestModel): Promise<string[]> => {
    const userProfile = await this.validateUserApplication.execute(String(detail.userId), req)
    const user = userProfile.userId as User

    const userWallet = await this.walletRepository.findById(user.walletId as string);

    if (!userWallet.hasEnoughFunds(massiveDecrease.tokenId, detail.amount)) {
      return ['Saldo insuficiente'];
    } 
    
    return [];
  }

  private validateNoteAndSetErrorMessage = (detail: MassiveDetail): string[] => {
    if (detail.note && detail.note.length > 256) return ['La nota no puede contener más de 256 caracteres'];
    return [];
  }
}