import { TransactionTypes } from "src/features/transaction/transaction.types";
import { CancelMassiveIncreaseApplication } from "./cancel-massive-increase.application";

export const CancelMassiveIncreaseApplicationProvider = {
    provide: TransactionTypes.APPLICATION.CANCEL_MASSIVE_INCREASE,
    useClass: CancelMassiveIncreaseApplication 
}