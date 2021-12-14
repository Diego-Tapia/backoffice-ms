import { DecrementTypes } from "../../decrement.types";
import { IndividualDecrementApplication } from "./individual-decrement.application";

export const IndividualDecrementApplicationProvider = {
  provide: DecrementTypes.APPLICATION.INDIVIDUAL_DECREMENT,
  useClass: IndividualDecrementApplication,
};
