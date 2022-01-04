import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { UserProfile } from '../../domain/entities/user-profile.entity';
import { IUserProfileRepository } from '../../infrastructure/repositories/user-profile/user-profile-repository.interface';
import { UserTypes } from '../../user.types';
import { IGetAllUserApplication } from './get-all-user-app.interface';

@Injectable()
export class GetAllUserApplication implements IGetAllUserApplication {
  constructor(
    @Inject(UserTypes.INFRASTRUCTURE.USER_PROFILE_REPOSITORY)
    private readonly userProfileRepository: IUserProfileRepository,
  ) {}

  public async execute(req: RequestModel): Promise<UserProfile[]> {
    const { clientId } = req.admin;

    try {

      const usersProfile = await this.userProfileRepository.findAll(null, 
        {
          path: 'userId',
          match: { clientId: clientId },
        }
      );

      return usersProfile.filter(user => user.userId !== null)

    } catch (error) {
      console.log(error)
      throw new BadRequestException('Error in GetAllUserApplication')
    }
  }
}
