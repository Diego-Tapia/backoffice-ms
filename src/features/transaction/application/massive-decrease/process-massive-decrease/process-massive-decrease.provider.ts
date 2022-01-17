import { TransactionTypes } from "src/features/transaction/transaction.types";
import { ProcessMassiveDecreaseApplication } from "./process-massive-decrease.application";

export const ProcessMassiveDecreaseApplicationProvider = {
    provide: TransactionTypes.APPLICATION.PROCESS_MASSIVE_DECREASE,
    useClass: ProcessMassiveDecreaseApplication 
}
