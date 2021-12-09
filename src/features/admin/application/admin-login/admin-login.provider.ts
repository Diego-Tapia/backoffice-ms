import { AdminTypes } from "../../admin.types";
import { AdminLoginApplication } from "./admin-login.application";

export const AdminLoginProvider = {
    provide: AdminTypes.APPLICATION.ADMIN_LOGIN,
    useClass: AdminLoginApplication,
  };
  