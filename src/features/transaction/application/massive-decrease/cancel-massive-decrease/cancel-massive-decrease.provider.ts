import { TransactionTypes } from "src/features/transaction/transaction.types";
import { CancelMassiveDecreaseApplication } from "./cancel-massive-decrease.application";

export const CancelMassiveDecreaseApplicationProvider = {
    provide: TransactionTypes.APPLICATION.CANCEL_MASSIVE_DECREASE,
    useClass: CancelMassiveDecreaseApplication
}