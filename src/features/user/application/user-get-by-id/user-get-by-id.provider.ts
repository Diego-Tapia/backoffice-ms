import { UserTypes } from "../../user.types";
import { UserGetByIdApplication } from "./user-get-by-id.application";


export const UserGetByIdProvider = {
  provide: UserTypes.APPLICATION.USER_GET_BY_ID,
  useClass: UserGetByIdApplication,
};