import { Injectable, Inject } from '@nestjs/common';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { Token } from '../../domain/entities/token.entity';
import { ITokenRepository } from '../../infrastructure/repositories/token-repository.interface';
import { TokenTypes } from '../../token.types';
import { IGetAllTokensApplication } from './get-all-tokens-app.interface';

@Injectable()
export class GetAllTokensApplication implements IGetAllTokensApplication {
  constructor(
    @Inject(TokenTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly tokenRepository: ITokenRepository,
  ) {}

  public execute(req: RequestModel): Promise<Token[]> {
    const { clientId } = req.admin;
    return this.tokenRepository.findAll(
      {clientId},
      [ { path: 'applicabilities' }, { path: 'operations' }]
    );
  }
}

