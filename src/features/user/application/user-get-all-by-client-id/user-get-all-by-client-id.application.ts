import { Injectable, Inject, Logger } from '@nestjs/common';
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
    //El usermodel actual tiene la property "client_id" pero de antes usaba "clientId"
    const client_id = req.admin.clientId;
    return this.userRepository.findAll({ client_id });
  }
}
