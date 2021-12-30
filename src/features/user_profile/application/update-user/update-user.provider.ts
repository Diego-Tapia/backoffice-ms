import { UserProfileTypes } from "../../user.types";
import { UpdateUserApplication } from "./update-user.application";

export const UpdateUserApplicationProvider = {
    provide: UserProfileTypes.APPLICATION.UPDATE_USER,
    useClass: UpdateUserApplication,
}
