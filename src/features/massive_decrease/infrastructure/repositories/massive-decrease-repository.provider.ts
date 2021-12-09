import { MassiveDecreaseTypes } from "../../massive-decrease.types";
import { MassiveDecreaseRepository } from "./massive-decrease.repository";

export const MassiveDecreaseRepositoryProvider = {
  provide: MassiveDecreaseTypes.INFRASTRUCTURE.REPOSITORY,
  useClass: MassiveDecreaseRepository,
};
