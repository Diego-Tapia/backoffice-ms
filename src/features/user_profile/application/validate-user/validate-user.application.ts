import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { User } from 'src/features/user/domain/entities/user.entity';
import { IUserRepository } from 'src/features/user/infrastructure/repositories/user-reposiory.interface';
import { UserTypes } from 'src/features/user/user.types';
import { UserProfile } from '../../domain/entities/userProfile.entity';
import { IUserProfileRepository } from '../../infrastructure/repositories/user-repository.interface';
import { UserProfileTypes } from '../../user.types';
import { IValidateUserApplication } from './validate-user-app.interface';

@Injectable()
export class ValidateUserApplication implements IValidateUserApplication {
  constructor(
    @Inject(UserTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(UserProfileTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userProfileRepository : IUserProfileRepository,
  ) {}

  public async execute(userIdentifier: string, request: RequestModel): Promise<UserProfile> {  
    const { clientId } = request.admin;

    let userTemp: User;
    let userProfile: UserProfile
    
    const isNumber = !isNaN(Number(userIdentifier)); 
  
    if (isNumber) userProfile = await this.userProfileRepository.findOneByParams(+userIdentifier)
    
    if (!userProfile && !isNumber ) userTemp = await this.userRepository.findOneByParams(userIdentifier);

    const user =  userTemp || userProfile?.userId as User
    if (!user) throw new HttpException('No se encontró ningun usuario con esa identificación', HttpStatus.NOT_FOUND);
    if(user.clientId !== clientId) throw new HttpException('No se encontró ningun usuario con esa identificación', HttpStatus.NOT_FOUND);
    
    userProfile = await this.userProfileRepository.findOneQueryAndPopulate({userId: user.id})
    if(!userProfile) throw new HttpException('No se encontró ningun usuario con esa identificación', HttpStatus.NOT_FOUND);

    return userProfile;
  }
}
