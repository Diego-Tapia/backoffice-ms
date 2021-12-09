import { MassiveDecreaseTypes } from "../../massive-decrease.types";
import { ProcessMassiveDecreaseApplication } from "./process-massive-decrease.application";

export const ProcessMassiveDecreaseApplicationProvider = {
    provide: MassiveDecreaseTypes.APPLICATION.PROCESS_MASSIVE_DECREASE,
    useClass: ProcessMassiveDecreaseApplication 
}
