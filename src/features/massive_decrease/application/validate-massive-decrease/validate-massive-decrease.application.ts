import { BadRequestException, Inject } from '@nestjs/common';
import { User } from 'src/features/user/domain/entities/user.entity';
import { UserTypes } from 'src/features/user/user.types';
import { IBalances } from 'src/features/wallet/domain/interfaces/balances.interface';
import { IWalletRepository } from 'src/features/wallet/infrastructure/repositories/wallet-repository.interface';
import { WalletTypes } from 'src/features/wallet/wallet.type';
import { MassiveDecreaseDetail } from '../../domain/entities/massive-decrease-detail.entity';
import { MassiveDecrease } from '../../domain/entities/massive-decrease.entity';
import { EMassiveDecreaseStatus } from '../../domain/enums/massive-decrease-status.enum';
import { EMassiveDecreaseDetailStatus } from '../../domain/enums/massive.decrease-detail-status.enum';
import { IMassiveDecreaseRepository } from '../../infrastructure/repositories/massive-decrease-repository.interface';
import { MassiveDecreaseTypes } from '../../massive-decrease.types';
import { IValidateMassiveDecreaseApplication } from './validate-massive-decrease-app.interface';
import { IUserProfileRepository } from 'src/features/user/infrastructure/repositories/user-profile/user-profile-repository.interface';
import { IValidateUserApplication } from 'src/features/user/application/validate-user/validate-user-app.interface';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';


export class ValidateMassiveDecreaseApplication implements IValidateMassiveDecreaseApplication {
  constructor(
    @Inject(MassiveDecreaseTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly massiveDecreaseRepository: IMassiveDecreaseRepository,
    @Inject(WalletTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletRepository: IWalletRepository,
    @Inject(UserTypes.APPLICATION.VALIDATE_USER)
    private readonly validateUserApplication: IValidateUserApplication,
  ) {}

  async execute(massiveDecrease: MassiveDecrease, req: RequestModel) {
    const { id } = massiveDecrease;

    if (massiveDecrease.status !== EMassiveDecreaseStatus.CREATED) throw new BadRequestException(`the status of the massive decrease should be  ${ EMassiveDecreaseStatus.CREATED }`);
    
    massiveDecrease.recordLengthTotal = massiveDecrease.detail.length
    massiveDecrease.recordLengthValidatedOk = 0;
    massiveDecrease.recordLengthValidatedError = 0
    massiveDecrease.totalAmountValidated = 0
    massiveDecrease.recordLengthExecutedError = 0;
    massiveDecrease.recordLengthExecutedOk = 0;
    massiveDecrease.totalAmountExecuted = 0;

    await this.validateDetailsAndSetStatus(massiveDecrease, req, (detail: MassiveDecreaseDetail) => {
      if (detail.status === EMassiveDecreaseDetailStatus.VALID) {
        massiveDecrease.recordLengthValidatedOk++
        massiveDecrease.totalAmountValidated += detail.amount
      } else {
        massiveDecrease.recordLengthValidatedError++
      }
    })

    massiveDecrease.status = (massiveDecrease.recordLengthValidatedOk) 
      ? EMassiveDecreaseStatus.READY_PROCESS
      : EMassiveDecreaseStatus.INVALID;
    return this.massiveDecreaseRepository.update(id, massiveDecrease)
  }


  private async validateDetailsAndSetStatus(massiveDecrease: MassiveDecrease, req: RequestModel, callback: Function) {
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
        ? EMassiveDecreaseDetailStatus.INVALID 
        : EMassiveDecreaseDetailStatus.VALID;
      callback(detail)
    }
  }

  private validateIdAndSetErrorMessage = async (detail: MassiveDecreaseDetail, req: RequestModel): Promise<string[]> => {
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

  private validateAmountAndSetErrorMessage = (detail: MassiveDecreaseDetail): string[] => {
    if (!detail.amount) return ['Se debe proporcionar un monto'];
    if (typeof detail.amount !== 'number' ) return ['El valor del monto debe ser un número'];
    if (detail.amount < 0) return ['El monto debe ser un número mayor a cero'];
    return []
  }

  private validateBalanceUserWalletAndSetErrorMessage = async (detail: MassiveDecreaseDetail, massiveDecrease: MassiveDecrease, req: RequestModel): Promise<string[]> => {
    const userProfile = await this.validateUserApplication.execute(String(detail.userId), req)
    const user = userProfile.userId as User

    const userWallet = await this.walletRepository.findById(user.walletId as string);

    if (!userWallet.hasEnoughFunds(massiveDecrease.tokenId, detail.amount)) {
      return ['Saldo insuficiente'];
    } 
    
    return [];
  }

  private validateNoteAndSetErrorMessage = (detail: MassiveDecreaseDetail): string[] => {
    if (detail.note && detail.note.length > 256) return ['La nota no puede contener más de 256 caracteres'];
    return [];
  }
}