import { MassiveIncreaseTypes } from "../../massive-increase.types";
import { CancelMassiveIncreaseApplication } from "./cancel-massive-increase.application";

export const CancelMassiveIncreaseApplicationProvider = {
    provide: MassiveIncreaseTypes.APPLICATION.CANCEL_MASSIVE_INCREASE,
    useClass: CancelMassiveIncreaseApplication 
}