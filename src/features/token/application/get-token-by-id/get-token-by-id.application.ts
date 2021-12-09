import { Injectable, Inject } from '@nestjs/common';
import { Token } from '../../domain/entities/token.entity';
import { ITokenRepository } from '../../infrastructure/repositories/token-repository.interface';
import { TokenTypes } from '../../token.types';
import { IGetTokenByIdApplication } from './get-token-by-id-app.interface';

@Injectable()
export class GetTokenByIdApplication implements IGetTokenByIdApplication {
  constructor(
    @Inject(TokenTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly tokenRepository: ITokenRepository,
  ) {}

  public execute(id: string): Promise<Token> {
    return this.tokenRepository.findById(id);
  }
}
