import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserModel } from '../../infrastructure/models/user.model';
import { IUserRepository } from '../../infrastructure/repositories/user-reposiory.interface';
import { UserTypes } from '../../user.types';
import { IUserGetAllByClientIdApplication } from './user-get-all-by-client-id.app.interface';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';

@Injectable()
export class UsersGetAllByClientIdApplication implements IUserGetAllByClientIdApplication {
  constructor(
    @Inject(UserTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  public execute(req: RequestModel): Promise<User[]> {
    const { clientId } = req.admin;
    return this.userRepository.findAll({ clientId });
  }
}