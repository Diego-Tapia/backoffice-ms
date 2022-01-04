import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { IUserRegisterApplication } from './register-user.app.interface';
import { IUserRepository } from '../../infrastructure/repositories/user/user-reposiory.interface';
import { UserTypes } from '../../user.types';
import { UserProfile } from 'src/features/user/domain/entities/user-profile.entity';
import { WalletTypes } from 'src/features/wallet/wallet.type';
import { IWalletRepository } from 'src/features/wallet/infrastructure/repositories/wallet-repository.interface';
import { EUserStatus } from '../../domain/enums/user.status.enum';
import { IUserProfileRepository } from '../../infrastructure/repositories/user-profile/user-profile-repository.interface';
import { UserRegister } from '../../domain/entities/user-register.entity';
import { RegisterUserDto } from '../../infrastructure/dto/register-user.dto';


@Injectable()
export class RegisterUserApplication implements IUserRegisterApplication {
  constructor(
    @Inject(UserTypes.INFRASTRUCTURE.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(UserTypes.INFRASTRUCTURE.USER_PROFILE_REPOSITORY)
    private readonly userProfileRepository: IUserProfileRepository,
    @Inject(WalletTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletRepository: IWalletRepository

  ) { }

  public async execute(registerUserDto: RegisterUserDto): Promise<any> {
    

    const { clientId,email, password, dni, shortName, lastName, cuil, phoneNumber, avatarUrl, username, customId } =
    registerUserDto;

    const userExists = await this.userProfileRepository.findOne({ dni });

    if (userExists) {
      throw new ConflictException('DNI is already registered');
    }

    if (userExists === null) {
      const userRegister = new UserRegister({username, email, password});
      // TODO: CREAR LA WALLET DESDE BLOCKCHAIN - CREAR SERVICIO PARA CONSUMIR BLOCKCHAIN-MS Y CREAR LA WALLET
      const wallet = await this.walletRepository.create()

      await this.userRepository.register(userRegister);
     
      const user = new User({
        customId,
        username,
        status: EUserStatus.ACTIVE,
        clientId,
        walletId: wallet.id          
      })

      const userSaved = await this.userRepository.create(user)
      
      const userProfile = new UserProfile({
        shortName,
        lastName,
        dni,
        cuil,
        email,
        avatarUrl,
        phoneNumber,
        userId: userSaved.id
      });
      
      await this.userProfileRepository.create(userProfile); 

    }
  }
}
