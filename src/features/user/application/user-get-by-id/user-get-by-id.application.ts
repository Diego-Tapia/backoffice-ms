import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../infrastructure/repositories/user-reposiory.interface';
import { UserTypes } from '../../user.types';
import { IUserGetByIdApplication } from './user-get-by-id-app.interface';

@Injectable()
export class UserGetByIdApplication implements IUserGetByIdApplication {
  constructor(
    @Inject(UserTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    return this.userRepository.findById(id);
  }
}
