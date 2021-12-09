import { AdminTypes } from "../../admin.types";
import { AdminRegisterApplication } from "./admin-register.application";

export const AdminRegisterProvider = {
    provide: AdminTypes.APPLICATION.ADMIN_REGISTER,
    useClass: AdminRegisterApplication,
  };
  