import { BadRequestException, Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from 'src/features/user/domain/entities/user.entity';
import { IUserRepository } from 'src/features/user/infrastructure/repositories/user-reposiory.interface';
import { UserTypes } from 'src/features/user/user.types';
import { UserProfile } from 'src/features/user_profile/domain/entities/userProfile.entity';
import { IUserProfileRepository } from 'src/features/user_profile/infrastructure/repositories/user-repository.interface';
import { UserProfileTypes } from 'src/features/user_profile/user.types';
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
    @Inject(UserTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(UserProfileTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userProfileRepository : IUserProfileRepository,
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

    await this.validateDetailsAndSetStatus(massiveIncrease.detail, (detail: MassiveIncreaseDetail) => {
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


  private async validateDetailsAndSetStatus(details: MassiveIncreaseDetail[], callback: Function) {
    for (let detail of details ) {
      detail.error = [];
      detail.error = detail.error
        .concat(await this.validateIdAndSetErrorMessage(detail))
        .concat(this.validateAmountAndSetErrorMessage(detail))
        .concat(this.validateNoteAndSetErrorMessage(detail));

      detail.status = (detail.error.length > 0) 
        ? EMassiveIncreaseDetailStatus.INVALID 
        : EMassiveIncreaseDetailStatus.VALID;
      callback(detail)
    }
  }

  private async validateIdAndSetErrorMessage(detail: MassiveIncreaseDetail): Promise<string[]> {
    const errorMessage: string[] = [];
    if (!detail.userId) errorMessage.push('Se debe proporcionar un identificador de usuario');
    if(typeof detail.userId === 'string' && detail.userId.match(new RegExp(/^([0-9]{2}-[0-9]{8}-[0-9]{1})$/g))) {
      detail.userId =  Number(detail.userId.split('-').join(''));
    }

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
    
    if (!user) errorMessage.push('El usuario no existe');

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