import { Inject, Injectable } from '@nestjs/common';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import configs from 'src/configs/environments/configs';
import { ConfigType } from '@nestjs/config';
import { AdminTypes } from '../../admin.types';
import { IAdminRepository } from '../../infrastructure/repositories/admin-repository.interface';
import { AdminLoginDTO } from '../../infrastructure/dto/admin-login.dto';
import { AuthResponse } from '../../domain/response/auth.response';
import { Login } from '../../domain/entities/loginAd,on.entity';
import { IAdminLoginApplication } from './admin-login-app.interface';

@Injectable()
export class AdminLoginApplication implements IAdminLoginApplication {
  private userPool: CognitoUserPool;
  constructor(

    @Inject(configs.KEY)
    private config: ConfigType<typeof configs>,
    @Inject(AdminTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly adminRepository: IAdminRepository,

  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.config.cognito.user_pool,
      ClientId: this.config.cognito.client_id,
    });
  }

  public async execute(userLoginDTO: AdminLoginDTO): Promise<AuthResponse> {
    const { username, password } = userLoginDTO;
    const login = new Login(username, password);

    await this.adminRepository.login(login);

    const payload: any = await this.adminRepository.findOne(username)
    const token = await this.adminRepository.generateJwt(payload);
    return { 
      token, 
      admin: payload 
    }
  }
}
