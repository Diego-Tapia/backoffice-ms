import { User } from '../../domain/entities/user.entity';

export interface IUserGetByIdApplication {
  execute(id: string): Promise<User>;
}
