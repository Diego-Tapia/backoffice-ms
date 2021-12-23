import { BadRequestException, Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from 'src/features/user/domain/entities/user.entity';
import { IUserRepository } from 'src/features/user/infrastructure/repositories/user-reposiory.interface';
import { UserTypes } from 'src/features/user/user.types';
import { UserProfile } from 'src/features/user_profile/domain/entities/userProfile.entity';
import { IUserProfileRepository } from 'src/features/user_profile/infrastructure/repositories/user-repository.interface';
import { UserProfileTypes } from 'src/features/user_profile/user.types';
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


export class ValidateMassiveDecreaseApplication implements IValidateMassiveDecreaseApplication {
  constructor(
    @Inject(MassiveDecreaseTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly massiveDecreaseRepository: IMassiveDecreaseRepository,
    @Inject(UserProfileTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userProfileRepository:IUserProfileRepository,
    @Inject(UserTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(WalletTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletRepository: IWalletRepository,
  ) {}

  async execute(massiveDecrease: MassiveDecrease) {
    const { id } = massiveDecrease;

    if (massiveDecrease.status !== EMassiveDecreaseStatus.CREATED) throw new BadRequestException(`the status of the massive decrease should be  ${ EMassiveDecreaseStatus.CREATED }`);
    
    massiveDecrease.recordLengthTotal = massiveDecrease.detail.length
    massiveDecrease.recordLengthValidatedOk = 0;
    massiveDecrease.recordLengthValidatedError = 0
    massiveDecrease.totalAmountValidated = 0
    massiveDecrease.recordLengthExecutedError = 0;
    massiveDecrease.recordLengthExecutedOk = 0;
    massiveDecrease.totalAmountExecuted = 0;

    await this.validateDetailsAndSetStatus(massiveDecrease, (detail: MassiveDecreaseDetail) => {
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


  private async validateDetailsAndSetStatus(massiveDecrease: MassiveDecrease, callback: Function) {
    for (let detail of massiveDecrease.detail ){
      detail.error = [];
      detail.error = detail.error
        .concat(this.validateIdAndSetErrorMessage(detail))
        .concat(this.validateAmountAndSetErrorMessage(detail))
        .concat(this.validateNoteAndSetErrorMessage(detail))
        .concat(await this.validateBalanceUserWalletAndSetErrorMessage(detail, massiveDecrease))
      detail.status = (detail.error.length > 0) 
        ? EMassiveDecreaseDetailStatus.INVALID 
        : EMassiveDecreaseDetailStatus.VALID;
      callback(detail)
    }
  }

  private validateIdAndSetErrorMessage = (detail: MassiveDecreaseDetail): string[] => {
    const errorMessage: string[] = [];
    if (!detail.userId) errorMessage.push('Se debe proporcionar un identificador de usuario');
    if(typeof detail.userId === 'string' && detail.userId.match(new RegExp(/^([0-9]{2}-[0-9]{8}-[0-9]{1})$/g))) {
      detail.userId =  Number(detail.userId.split('-').join(''));
    }
    return errorMessage;
  }

  private validateAmountAndSetErrorMessage = (detail: MassiveDecreaseDetail): string[] => {
    const errorMessage: string[] = [];
    if (!detail.amount) errorMessage.push('Se debe proporcionar un monto');
    if (typeof detail.amount !== 'number' ) errorMessage.push('El valor del monto debe ser un número');
    if (detail.amount < 0) errorMessage.push('El monto debe ser un número mayor a cero');
    return errorMessage;
  }

  private validateBalanceUserWalletAndSetErrorMessage = async (detail: MassiveDecreaseDetail, massiveDecrease: MassiveDecrease): Promise<string[]> => {
    const errorMessage: string[] = [];
    let userTemp: User;
    let userProfile: UserProfile

    const isNumber = !isNaN(Number(detail.userId)); 
    
    if (isNumber) {
      userProfile = await this.userProfileRepository.findOneByParams(+detail.userId)
    }

    if (!userProfile && !isNumber ) {
      userTemp = await this.userRepository.findOneByParams(detail.userId as string);
    }
    
    const user =  userTemp || userProfile?.userId as User
    
    if (!user) {
      errorMessage.push('El usuario no existe')
      return errorMessage
    }
    
    if (detail.amount && typeof detail.amount === 'number') {
      const userWallet = await this.walletRepository.findById(user.walletId);
      const balanceUserWalletByTokenId = userWallet.balances
      .filter((balance: IBalances) => balance.tokenId.toString() === massiveDecrease.tokenId)
      .map((balance) => balance.amount)
      .reduce((pre, curr) => pre + curr, 0);
      if (balanceUserWalletByTokenId < detail.amount) errorMessage.push('Saldo insuficiente')
    }
    return errorMessage;
  }

  private validateNoteAndSetErrorMessage = (detail: MassiveDecreaseDetail): string[] => {
    const errorMessage: string[] = [];
    if (detail.note && detail.note.length > 256) errorMessage.push('La nota no puede contener más de 256 caracteres');
    return errorMessage;
  }
}