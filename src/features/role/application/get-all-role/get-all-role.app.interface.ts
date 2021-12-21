import { Role } from "../../domain/entities/role.entity";

export interface IGetAllRoleApplication {
    execute(): Promise<Role[]>;
  }
  