import { MassiveIncreaseTypes } from "../../massive-increase.types";
import { MassiveIncreaseRepository } from "./massive-increase.repository";

export const MassiveIncreaseRepositoryProvider = {
  provide: MassiveIncreaseTypes.INFRASTRUCTURE.REPOSITORY,
  useClass: MassiveIncreaseRepository,
};
