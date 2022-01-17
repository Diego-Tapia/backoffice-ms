import { TransactionTypes } from "../../transaction.types";
import { IndividualDecreaseApplication } from "./individual-decrease.application";

export const IndividualDecreaseApplicationProvider = {
  provide: TransactionTypes.APPLICATION.INDIVIDUAL_DECREASE,
  useClass: IndividualDecreaseApplication,
};
