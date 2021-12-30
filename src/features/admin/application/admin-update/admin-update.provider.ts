import { AdminTypes } from "../../admin.types";
import { AdminUpdateApplication } from "./admin-update.application";

export const AdminUpdateApplicationProvider = {
  provide: AdminTypes.APPLICATION.ADMIN_UPDATE,
  useClass: AdminUpdateApplication,
}