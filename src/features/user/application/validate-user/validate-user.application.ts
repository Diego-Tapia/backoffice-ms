import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { User } from 'src/features/user/domain/entities/user.entity';
import { IUserRepository } from 'src/features/user/infrastructure/repositories/user/user-reposiory.interface';
import { UserTypes } from 'src/features/user/user.types';
import { UserProfile } from '../../domain/entities/user-profile.entity';
import { EUserStatus } from '../../domain/enums/user.status.enum';
import { IUserProfileRepository } from '../../infrastructure/repositories/user-profile/user-profile-repository.interface';
import { IValidateUserApplication } from './validate-user-app.interface';

@Injectable()
export class ValidateUserApplication implements IValidateUserApplication {
  constructor(
    @Inject(UserTypes.INFRASTRUCTURE.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(UserTypes.INFRASTRUCTURE.USER_PROFILE_REPOSITORY)
    private readonly userProfileRepository : IUserProfileRepository,
  ) {}

  public async execute(userIdentifier: string, request: RequestModel): Promise<UserProfile> {  
    const { clientId } = request.admin;

    let usersTemp: User[];
    let usersProfile: UserProfile[]
    
    const isNumber = !isNaN(Number(userIdentifier));

    if (isNumber) {
      usersProfile = await this.userProfileRepository.findAll(
        { $or: [ { dni: +userIdentifier }, { cuil: +userIdentifier } ] }, 
        { path: 'userId' }
      );
    } 
    
    if (!usersProfile && !isNumber ) {
      usersTemp = await this.userRepository.findAll(
        { $or: [{ customId: userIdentifier }, { username: userIdentifier }] }
      );
    }
    
    const users = usersTemp || usersProfile?.map(userProfile => userProfile.userId as User);

    const user = users.find(user => user.clientId === clientId);
    
    if (!user) throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    if (user.status !== EUserStatus.ACTIVE) throw new HttpException(`El estado del usuario es: ${user.status}`, HttpStatus.NOT_FOUND);

    const userProfile = await this.userProfileRepository.findOne(
      { userId: user.id }, 
      { path: 'userId' }
    );
    
    if(!userProfile) throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);

    return userProfile;
  }
}
