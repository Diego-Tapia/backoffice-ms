import { TransactionTypes } from "src/features/transaction/transaction.types";
import { CreateMassiveDecreaseApplication } from "./create-massive-decrease.application";

export const CreateMassiveDecreaseApplicationProvider = {
    provide: TransactionTypes.APPLICATION.CREATE_MASSIVE_DECREASE,
    useClass: CreateMassiveDecreaseApplication 
}
