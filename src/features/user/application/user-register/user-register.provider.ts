import { UserTypes } from "../../user.types";
import { UserRegisterApplication } from "./user-register.application";

export const UserRegistrerProvider = {
  provide: UserTypes.APPLICATION.USER_REGISTER,
  useClass: UserRegisterApplication,
};
