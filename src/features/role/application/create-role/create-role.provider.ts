import { RoleTypes } from "../../role.types";
import { CreateRoleApplication } from "./create-role.application";

export const CreateRoleApplicationProvider = {
  provide: RoleTypes.APPLICATION.CREATE,
  useClass: CreateRoleApplication,
};
