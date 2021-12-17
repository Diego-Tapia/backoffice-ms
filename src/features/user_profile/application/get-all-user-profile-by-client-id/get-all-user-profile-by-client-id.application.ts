import { Injectable, Inject } from '@nestjs/common';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { UserProfile } from '../../domain/entities/userProfile.entity';
import { IUserProfileRepository } from '../../infrastructure/repositories/user-repository.interface';
import { UserProfileTypes } from '../../user.types';
import { IGetAllUserProfileByClientIdApplication } from './get-all-user-profile-by-client-id-app.interface';

@Injectable()
export class GetAllUserProfileByClientIdApplication implements IGetAllUserProfileByClientIdApplication {
  constructor(
    @Inject(UserProfileTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userProfileRepository: IUserProfileRepository,
  ) {}

  public execute(req: RequestModel): Promise<UserProfile[]> {
    const { clientId } = req.admin;
    return this.userProfileRepository.findAllByClientIdAndPopulate(clientId);
  }
}
