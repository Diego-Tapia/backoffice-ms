import { Role } from "../../domain/entities/role.entity";
import { RoleDto } from "../../infrastructure/dtos/role.dto";

export interface ICreateRoleApplication {
    execute(roleDto: RoleDto): Promise<Role>;
  }
  