import { Injectable, Inject, BadRequestException, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { UserProfile } from '../../domain/entities/user-profile.entity';
import { User } from '../../domain/entities/user.entity';
import { IUserProfileRepository } from '../../infrastructure/repositories/user-profile/user-profile-repository.interface';
import { UserTypes } from '../../user.types';
import { IGetUserByIdApplication } from './get-user-by-id-app.interface';

@Injectable()
export class GetUserByIdApplication implements IGetUserByIdApplication {
  constructor(
    @Inject(UserTypes.INFRASTRUCTURE.USER_PROFILE_REPOSITORY)
    private readonly userProfileRepository: IUserProfileRepository,
  ) {}

  public async execute(id: string, request: RequestModel): Promise<UserProfile> {
    const { clientId } = request.admin;

    try {

      const userProfile = await this.userProfileRepository.findOne(
        { $or: [ { _id: id }, { userId: id } ] }, 
        { path: 'userId' }
      );

      if (!userProfile) throw new BadRequestException('El usuario no existe')
      
      const user = userProfile.userId as User;
      
      if (clientId !== user.clientId) {
        throw new BadRequestException('El usuario no existe');
      }
      
      return userProfile
    
    } catch (error) {
      throw new HttpException(error.message || 'Error in GetUserByIdApplication', error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
