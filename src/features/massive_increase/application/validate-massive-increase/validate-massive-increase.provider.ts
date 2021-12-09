import { MassiveIncreaseTypes } from "../../massive-increase.types";
import { ValidateMassiveIncreaseApplication } from "./validate-massive-increase.application";

export const ValidateMassiveIncreaseApplicationProvider = {
    provide: MassiveIncreaseTypes.APPLICATION.VALIDATE_MASSIVE_INCREASE,
    useClass: ValidateMassiveIncreaseApplication 
}
