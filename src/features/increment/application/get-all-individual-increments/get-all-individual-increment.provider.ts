import { IncrementTypes } from "../../increment.types";
import { GetAllIndividualIncrementApplication } from "./get-all-individual-increment.application";

export const GetAllIndividualIncrementApplicationProvider = {
  provide: IncrementTypes.APPLICATION.GET_ALL_INDIVIDUAL_INCREMENT,
  useClass: GetAllIndividualIncrementApplication,
};
