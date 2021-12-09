import { Inject, Injectable } from '@nestjs/common';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import configs from 'src/configs/environments/configs';
import { ConfigType } from '@nestjs/config';
import { AdminTypes } from '../../admin.types';
import { AdminConfirmDTO } from '../../infrastructure/dto/admin-confirm.dto';
import { Confirm } from '../../domain/confirmAdmin.entity';
import { IAdminRepository } from '../../infrastructure/repositories/admin-repository.interface';
import { IAdminConfirmApplication } from './admin-confirm-app.interface';

@Injectable()
export class AdminConfirmApplication implements IAdminConfirmApplication {
  private userPool: CognitoUserPool;
  // eslint-disable-next-line @typescript-eslint/ban-types
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

  public async execute(userConfirmDTO: AdminConfirmDTO): Promise<any> {
    
    const { username, confirmCode } = userConfirmDTO;
    const adminConfirm = new Confirm(username, confirmCode);
    await this.adminRepository.confirm(adminConfirm);
  }
}
