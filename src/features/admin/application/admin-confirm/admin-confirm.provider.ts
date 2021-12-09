import { AdminTypes } from "../../admin.types";
import { AdminConfirmApplication } from "./admin-confirm.application";

export const AdminConfirmProvider = {
    provide: AdminTypes.APPLICATION.ADMIN_CONFIRM,
    useClass: AdminConfirmApplication,
  };
  