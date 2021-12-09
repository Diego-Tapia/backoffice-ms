import { Injectable, Inject } from '@nestjs/common';
import { UserProfile } from '../../domain/entities/userProfile.entity';
import { CreateUserProfileDto } from '../../infrastructure/dtos/create-user.dto';
import { IUserProfileRepository } from '../../infrastructure/repositories/user-repository.interface';
import { UserProfileTypes } from '../../user.types';
import { ICreateUserApplication } from './create-user.app.interface';

@Injectable()
export class CreateUserApplication implements ICreateUserApplication {
  constructor(
    @Inject(UserProfileTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userRepository: IUserProfileRepository,
  ) { }

  public execute(createUserDto: CreateUserProfileDto): Promise<UserProfile> {
    
    const { user_id, dni, shortName, lastName, cuil, avatarUrl, email, phoneNumber } = createUserDto;
    const user = new UserProfile(shortName, lastName, dni, cuil, avatarUrl, email, phoneNumber,user_id);

    return this.userRepository.create(user);
  }
}
