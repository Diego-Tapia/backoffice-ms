import { AdminLoginDTO } from "../../infrastructure/dto/admin-login.dto";
import { AuthResponse } from "../../domain/response/auth.response";

export interface IAdminLoginApplication {
    execute(userLoginDTO: AdminLoginDTO):Promise<AuthResponse>
  }