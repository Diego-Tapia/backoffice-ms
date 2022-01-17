import { TransactionTypes } from "src/features/transaction/transaction.types";
import { ValidateMassiveIncreaseApplication } from "./validate-massive-increase.application";

export const ValidateMassiveIncreaseApplicationProvider = {
    provide: TransactionTypes.APPLICATION.VALIDATE_MASSIVE_INCREASE,
    useClass: ValidateMassiveIncreaseApplication 
}
