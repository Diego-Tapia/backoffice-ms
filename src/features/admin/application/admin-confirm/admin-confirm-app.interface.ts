import { AdminConfirmDTO } from "../../infrastructure/dto/admin-confirm.dto";
import { AuthResponse } from "../../infrastructure/models/auth-response.model";

export interface IAdminConfirmApplication {
    execute(adminConfirmDTO: AdminConfirmDTO):Promise<AuthResponse>
  }