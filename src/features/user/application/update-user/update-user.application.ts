import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { User } from '../../domain/entities/user.entity';
import { UpdateUserDto } from '../../infrastructure/dto/update-user.dto';
import { IUserProfileRepository } from '../../infrastructure/repositories/user-profile/user-profile-repository.interface';
import { IUserRepository } from '../../infrastructure/repositories/user/user-reposiory.interface';
import { UserTypes } from '../../user.types';
import { IUpdateUserApplication } from './update-user-app.interface';

@Injectable()
export class UpdateUserApplication implements IUpdateUserApplication {
  constructor(
    @Inject(UserTypes.INFRASTRUCTURE.USER_PROFILE_REPOSITORY)
    private readonly userProfileRepository: IUserProfileRepository,
    @Inject(UserTypes.INFRASTRUCTURE.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  public async execute(id: string, updateUserDto: UpdateUserDto) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      let userProfile = await this.userProfileRepository.update(
        { $or: [ { _id: id }, { userId: id } ] }, 
        updateUserDto, 
        { path: 'userId' },
        session
      )

      const user = userProfile.userId as User
      
      await this.userRepository.update({ _id: user.id }, updateUserDto, null, session)
      
      userProfile = await this.userProfileRepository.findById(userProfile.id, {path: 'userId'})
      
      await session.commitTransaction();

      return userProfile

    } catch(error) {
      session.abortTransaction();
      throw new HttpException(error.message || 'Error in updateUserApplication', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      session.endSession();
    }
  }
}
