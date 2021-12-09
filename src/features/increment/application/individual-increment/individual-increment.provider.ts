import { IncrementTypes } from "../../increment.types";
import { IndividualIncrementApplication } from "./individual-increment.application";

export const IndividualIncrementApplicationProvider = {
  provide: IncrementTypes.APPLICATION.INDIVIDUAL_INCREMENT,
  useClass: IndividualIncrementApplication,
};
