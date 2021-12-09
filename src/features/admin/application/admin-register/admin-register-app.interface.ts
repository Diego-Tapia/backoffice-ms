import { AdminRegisterDTO } from "../../infrastructure/dto/admin-register.dto";

export interface IAdminRegisterApplication {
    execute(adminRegisterDTO: AdminRegisterDTO):Promise<void>
  }