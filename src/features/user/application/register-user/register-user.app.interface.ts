import { RegisterUserDto } from "../../infrastructure/dto/register-user.dto";

export interface IUserRegisterApplication {
  execute(registerUserDto: RegisterUserDto): any;
}
