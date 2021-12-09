import { Injectable, Inject } from '@nestjs/common';
import { UserProfile } from '../../domain/entities/userProfile.entity';
import { IUserProfileRepository } from '../../infrastructure/repositories/user-repository.interface';
import { UserProfileTypes } from '../../user.types';
import { IGetAllUsersApplication } from './get-all-users.app.interface';

@Injectable()
export class GetAllUsersApplication implements IGetAllUsersApplication {
  constructor(
    @Inject(UserProfileTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userRepository: IUserProfileRepository,
  ) {}

  public execute(): Promise<UserProfile[]> {
    return this.userRepository.findAll();
  }
}
