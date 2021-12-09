import { UserRegisterDTO } from '../../infrastructure/dto/user-register.dto';

export interface IUserRegisterApplication {
  execute(userRegisterDTO: UserRegisterDTO): any;
}
