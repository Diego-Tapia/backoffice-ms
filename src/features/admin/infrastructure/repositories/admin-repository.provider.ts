import { AdminTypes } from "../../admin.types";
import { AdminRepository } from "./admin-repository";


export const AdminRepositoryProvider = {
  provide: AdminTypes.INFRASTRUCTURE.REPOSITORY,
  useClass: AdminRepository,
};






