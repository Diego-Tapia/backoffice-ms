import { TransactionTypes } from "src/features/transaction/transaction.types";
import { ProcessMassiveIncreaseApplication } from "./process-massive-increase.application";

export const ProcessMassiveIncreaseApplicationProvider = {
    provide: TransactionTypes.APPLICATION.PROCESS_MASSIVE_INCREASE,
    useClass: ProcessMassiveIncreaseApplication 
}
