import { MassiveIncreaseTypes } from "../../massive-increase.types";
import { ProcessMassiveIncreaseApplication } from "./process-massive-increase.application";

export const ProcessMassiveIncreaseApplicationProvider = {
    provide: MassiveIncreaseTypes.APPLICATION.PROCESS_MASSIVE_INCREASE,
    useClass: ProcessMassiveIncreaseApplication 
}
