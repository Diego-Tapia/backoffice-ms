import { UserTypes } from "../../user.types";
import { UserRepository } from "./user-repository";

export const UserRepositoryProvider = {
  provide: UserTypes.INFRASTRUCTURE.REPOSITORY,
  useClass: UserRepository,
};
