import { UserTypes } from "../../user.types";
import { RegisterUserApplication } from "./register-user.application";

export const RegistrerUserApplicationProvider = {
  provide: UserTypes.APPLICATION.REGISTER_USER,
  useClass: RegisterUserApplication,
};
