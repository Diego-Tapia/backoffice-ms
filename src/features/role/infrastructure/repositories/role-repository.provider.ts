import { RoleTypes } from "../../role.types";
import { RoleRepository } from "./role.repository";

export const RoleRepositoryProvider = {
  provide: RoleTypes.INFRASTRUCTURE.REPOSITORY,
  useClass: RoleRepository,
};
