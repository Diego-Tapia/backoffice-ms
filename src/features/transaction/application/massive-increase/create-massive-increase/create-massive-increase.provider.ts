import { TransactionTypes } from "src/features/transaction/transaction.types";
import { CreateMassiveIncreaseApplication } from "./create-massive-increase.application";

export const CreateMassiveIncreaseApplicationProvider = {
    provide: TransactionTypes.APPLICATION.CREATE_MASSIVE_INCREASE,
    useClass: CreateMassiveIncreaseApplication 
}
