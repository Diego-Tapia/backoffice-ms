import { FilterQuery, UpdateQuery } from "mongoose";
import { Admin } from "../../domain/entities/admin.entity";
import { Confirm } from "../../domain/entities/confirmAdmin.entity";
import { Login } from "../../domain/entities/loginAd,on.entity";
import { Register } from "../../domain/entities/registerAdmin.entity";
import { AuthResponse } from "../../domain/response/auth.response";
import { AdminModel } from "../models/admin.model";

export interface IAdminRepository {
  register(userRegister: Register): Promise<void>;
  confirm(userConfirm: Confirm): Promise<unknown>;
  login(userLogin: Login): Promise<AuthResponse>;
  verifyJwt(jwt: string): Promise<any>;
  generateJwt(admin: Admin): Promise<any>;
  create(admin: Admin): Promise<Admin>;
  findOne(username: string): Promise<Admin>;
  findByDni(dni: number): Promise<Admin>;
  findAll(FilterQuery?: FilterQuery<AdminModel>): Promise<Admin[]>;
  findById(id: string): Promise<Admin>;
  update(id: string, update: UpdateQuery<any>): Promise<Admin>;
}
