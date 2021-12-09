import { MassiveDecreaseTypes } from "../../massive-decrease.types";
import { CancelMassiveDecreaseApplication } from "./cancel-massive-decrease.application";

export const CancelMassiveDecreaseApplicationProvider = {
    provide: MassiveDecreaseTypes.APPLICATION.CANCEL_MASSIVE_DECREASE,
    useClass: CancelMassiveDecreaseApplication
}