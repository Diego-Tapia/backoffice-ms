import { AdminConfirmDTO } from "../../infrastructure/dto/admin-confirm.dto";
import { AuthResponse } from "../../domain/response/auth.response";

export interface IAdminConfirmApplication {
    execute(adminConfirmDTO: AdminConfirmDTO):Promise<AuthResponse>
  }