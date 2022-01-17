import { TransactionTypes } from "src/features/transaction/transaction.types";
import { ValidateMassiveDecreaseApplication } from "./validate-massive-decrease.application";


export const ValidateMassiveDecreaseApplicationProvider = {
    provide: TransactionTypes.APPLICATION.VALIDATE_MASSIVE_DECREASE,
    useClass: ValidateMassiveDecreaseApplication 
}
