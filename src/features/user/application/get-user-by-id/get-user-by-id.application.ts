import { Injectable, Inject, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { UserProfile } from '../../domain/entities/user-profile.entity';
import { IUserProfileRepository } from '../../infrastructure/repositories/user-profile/user-profile-repository.interface';
import { UserTypes } from '../../user.types';
import { IGetUserByIdApplication } from './get-user-by-id-app.interface';

@Injectable()
export class GetUserByIdApplication implements IGetUserByIdApplication {
  constructor(
    @Inject(UserTypes.INFRASTRUCTURE.USER_PROFILE_REPOSITORY)
    private readonly userProfileRepository: IUserProfileRepository,
  ) {}

  public async execute(id: string): Promise<UserProfile> {
    try {
      const user = await this.userProfileRepository.findOne({ $or: [ { _id: id }, { userId: id } ] }, { path: 'userId' });
      
      if (!user) throw new BadRequestException('El usuario no existe')
      
      return user
    
    } catch (error) {
      throw new HttpException(error.message || 'Error in GetUserByIdApplication', error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
