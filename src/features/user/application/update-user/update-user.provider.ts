import { UserTypes } from "../../user.types";
import { UpdateUserApplication } from "./update-user.application";

export const UpdateUserApplicationProvider = {
    provide: UserTypes.APPLICATION.UPDATE_USER,
    useClass: UpdateUserApplication,
}
