import { Admin } from "../../domain/admin.entity";
import { Confirm } from "../../domain/confirmAdmin.entity";
import { Login } from "../../domain/loginAd,on.entity";
import { Register } from "../../domain/registerAdmin.entity";
import { AuthResponse } from "../models/auth-response.model";

export interface IAdminRepository {
  register(userRegister: Register): Promise<void>;
  confirm(userConfirm: Confirm): Promise<unknown>;
  login(userLogin: Login): Promise<AuthResponse>;
  verifyJwt(jwt: string): Promise<any>;
  generateJwt(admin: Admin): Promise<any>;
  create(admin: Admin): Promise<Admin>;
  findOne(username: string): Promise<Admin>;
  findByDni(dni: number): Promise<Admin>;
}
