import { AdminTypes } from "../../admin.types";
import { GetAdminByClientIdApplication } from "./admin-get-by-client-id.application";

export const GetAdminByClientIdApplicationProvider = {
    provide: AdminTypes.APPLICATION.GET_BY_CLIENT_ID,
    useClass: GetAdminByClientIdApplication,
}
