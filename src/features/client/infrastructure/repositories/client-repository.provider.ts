import { ClientTypes } from "../../client.types";
import { ClientRepository } from "./client.repository";

export const ClientRepositoryProvider = {
  provide: ClientTypes.INFRASTRUCTURE.REPOSITORY,
  useClass: ClientRepository,
};
