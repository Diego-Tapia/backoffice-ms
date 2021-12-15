import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserRegisterDTO } from '../../infrastructure/dto/user-register.dto';
import { UserProfileTypes } from 'src/features/user_profile/user.types';
import { User } from '../../domain/entities/user.entity';
import { IUserRegisterApplication } from './user-register.app.interface';
import { IUserRepository } from '../../infrastructure/repositories/user-reposiory.interface';
import { Register } from '../../domain/entities/user-register.entity';
import { UserTypes } from '../../user.types';
import {InjectConnection} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IUserProfileRepository } from 'src/features/user_profile/infrastructure/repositories/user-repository.interface';
import { UserProfile } from 'src/features/user_profile/domain/entities/userProfile.entity';


@Injectable()
export class UserRegisterApplication implements IUserRegisterApplication {
  constructor(
    @Inject(UserTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(UserProfileTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userProfileRepository: IUserProfileRepository,

  ) { }

  public async execute(userRegisterDto: UserRegisterDTO): Promise<any> {
    

    const { clientId,email, password, dni, shortName, lastName, cuil, phoneNumber, avatarUrl, username, customId } =
      userRegisterDto;

    const userExists = await this.userProfileRepository.findOne(dni);

    if (userExists) {
      throw new ConflictException('DNI is already registered');
    }

    if (userExists === null) {
      const userRegister = new Register(username, email, password);
      await this.userRepository.register(userRegister);
     
      const user = new User(
        customId,
        username,
        "ACTIVE",
        clientId,
     )
      const userSaved = await this.userRepository.create(user)
      
      const userProfile = new UserProfile(
        shortName,
        lastName,
        dni,
        cuil,
        email,
        avatarUrl,
        phoneNumber,
        userSaved._id
      );
      await this.userProfileRepository.create(userProfile); 

    }
  }
}
