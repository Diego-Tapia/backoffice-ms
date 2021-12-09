import { MassiveDecreaseTypes } from "../../massive-decrease.types";
import { CreateMassiveDecreaseApplication } from "./create-massive-decrease.application";

export const CreateMassiveDecreaseApplicationProvider = {
    provide: MassiveDecreaseTypes.APPLICATION.CREATE_MASSIVE_DECREASE,
    useClass: CreateMassiveDecreaseApplication 
}
