import { Injectable, Inject } from '@nestjs/common';
import { UserProfile } from '../../domain/entities/userProfile.entity';
import { IUserProfileRepository } from '../../infrastructure/repositories/user-repository.interface';
import { UserProfileTypes } from '../../user.types';
import { IGetUserpplication } from './get-user-app.interface';

@Injectable()
export class GetUserApplication implements IGetUserpplication {
  constructor(
    @Inject(UserProfileTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userRepository: IUserProfileRepository,
  ) {}

  public execute(dni: number): Promise<UserProfile> {
    return this.userRepository.findOne(dni);
  }
}
