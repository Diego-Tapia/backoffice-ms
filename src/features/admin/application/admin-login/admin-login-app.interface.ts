import { AdminLoginDTO } from "../../infrastructure/dto/admin-login.dto";
import { AuthResponse } from "../../infrastructure/models/auth-response.model";

export interface IAdminLoginApplication {
    execute(userLoginDTO: AdminLoginDTO):Promise<AuthResponse>
  }