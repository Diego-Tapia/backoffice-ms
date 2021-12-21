import { RoleTypes } from "../../role.types";
import { GetAllRoleApplication } from "./get-all-role.application";

export const GetAllRoleApplicationProvider = {
  provide: RoleTypes.APPLICATION.GET_ALL,
  useClass: GetAllRoleApplication,
};
