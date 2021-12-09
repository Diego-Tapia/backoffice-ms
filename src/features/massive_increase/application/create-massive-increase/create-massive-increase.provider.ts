import { MassiveIncreaseTypes } from "../../massive-increase.types";
import { CreateMassiveIncreaseApplication } from "./create-massive-increase.application";

export const CreateMassiveIncreaseApplicationProvider = {
    provide: MassiveIncreaseTypes.APPLICATION.CREATE_MASSIVE_INCREASE,
    useClass: CreateMassiveIncreaseApplication 
}
