import { UserTypes } from "src/features/user/user.types";
import { UserRepository } from "./user-repository";

export const UserRepositoryProvider = {
  provide: UserTypes.INFRASTRUCTURE.USER_REPOSITORY,
  useClass: UserRepository,
};
