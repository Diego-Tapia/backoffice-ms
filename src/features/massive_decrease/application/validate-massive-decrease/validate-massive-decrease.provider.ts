import { MassiveDecreaseTypes } from "../../massive-decrease.types";
import { ValidateMassiveDecreaseApplication } from "./validate-massive-decrease.application";


export const ValidateMassiveDecreaseApplicationProvider = {
    provide: MassiveDecreaseTypes.APPLICATION.VALIDATE_MASSIVE_DECREASE,
    useClass: ValidateMassiveDecreaseApplication 
}
