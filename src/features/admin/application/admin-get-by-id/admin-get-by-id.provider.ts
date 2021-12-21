import { AdminTypes } from "../../admin.types";
import { GetAdminByIdApplication } from "./admin-get-by-id.application";

export const GetAdminByIdApplicationProvider = {
    provide: AdminTypes.APPLICATION.GET_BY_ID,
    useClass: GetAdminByIdApplication,
}
