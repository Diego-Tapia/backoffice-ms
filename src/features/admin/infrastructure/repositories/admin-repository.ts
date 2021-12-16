
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from "amazon-cognito-identity-js";
import { Model } from "mongoose";
import configs from "src/configs/environments/configs";
import { Admin } from "../../domain/admin.entity";
import { Confirm } from "../../domain/confirmAdmin.entity";
import { Login } from "../../domain/loginAd,on.entity";
import { Register } from "../../domain/registerAdmin.entity";
import { AdminModel } from "../models/admin.model";
import { IAdminRepository } from "./admin-repository.interface";


@Injectable()
export class AdminRepository implements IAdminRepository {
  private userPool: CognitoUserPool;
  constructor(
    @Inject(configs.KEY)
    private config: ConfigType<typeof configs>,
    private readonly jwtService: JwtService,
    @InjectModel(AdminModel.name) private readonly adminModel: Model<AdminModel>
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.config.cognito.user_pool,
      ClientId: this.config.cognito.client_id,
    });
  }
 

  public register(register: Register): Promise<any> {
    const username = register.username;
    const email = register.email;
    const password = register.password;

    return new Promise((resolve, reject) => {
      return this.userPool.signUp(
        username,
        password,
        [new CognitoUserAttribute({ Name: 'email', Value: email })],
        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.user);
          }
        },
      );
    });
  }

  public confirm(confirm: Confirm) {
    const username = confirm.usarname;
    const confirmCode = confirm.confirmCode;

    const userData = {
      Username: username,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(confirmCode, true, function (err, result) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  public async login(login: Login): Promise<any> {
    const username = login.username;
    const password = login.password;

    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
    const userData = {
      Username: username,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);

    return await new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  public async findOne(username: string): Promise<Admin> {
    const adminModel = await this.adminModel.findOne({username : username }).exec();
    return adminModel ? this.toDomainEntity(adminModel) : null;
  }

  public async findByDni(dni: number): Promise<Admin> {
    const adminModel = await this.adminModel.findOne({dni : dni }).exec();
    return adminModel ? this.toDomainEntity(adminModel) : null;
  }

  public async create(admin: Admin): Promise<Admin> {
    const savedAdmin = await new this.adminModel(admin).save();
    return this.toDomainEntity(savedAdmin);
  }


  private  toDomainEntity(model: AdminModel): Admin{
    const { shortName, lastName, dni, cuil, email, clientId, phoneNumber, username, _id, avatarUrl } = model;
    const adminEntity = new Admin({
        shortName,
        lastName,
        dni,
        cuil,
        email,
        phoneNumber,
        clientId: clientId.toString(),
        username,
        avatarUrl,
        id: _id.toString()
    });
    return  adminEntity;
  }



  async generateJwt(admin: Admin): Promise<string> {
    return this.jwtService.signAsync({ admin });
  }

  public verifyJwt(jwt: string): Promise<any> {
    return this.jwtService.verifyAsync(jwt);
  }

}
