import { Injectable, Inject } from '@nestjs/common';
import { UserProfile } from '../../domain/entities/userProfile.entity';
import { IUserProfileRepository } from '../../infrastructure/repositories/user-repository.interface';
import { UserProfileTypes } from '../../user.types';
import { IGetUserProfileByIdApplication } from './get-user-profile-by-id-app.interface';

@Injectable()
export class GetUserProfileByIdApplication implements IGetUserProfileByIdApplication {
  constructor(
    @Inject(UserProfileTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userProfileRepository: IUserProfileRepository,
  ) {}

  public execute(id: string): Promise<UserProfile> {
    return this.userProfileRepository.findByIdAndPopulate(id);
  }
}
