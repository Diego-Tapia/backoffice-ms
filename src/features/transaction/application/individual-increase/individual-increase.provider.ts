import { TransactionTypes } from "../../transaction.types";
import { IndividualIncreaseApplication } from "./individual-increase.application";

export const IndividualIncreaseApplicationProvider = {
  provide: TransactionTypes.APPLICATION.INDIVIDUAL_INCREASE,
  useClass: IndividualIncreaseApplication,
};
