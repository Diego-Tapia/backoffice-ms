import { Injectable, Inject, Logger, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { Token } from '../../domain/entities/token.entity';
import { ITokenRepository } from '../../infrastructure/repositories/token-repository.interface';
import { TokenTypes } from '../../token.types';
import { IGetTokenApplication } from './get-token-app.interface';

@Injectable()
export class GetTokenApplication implements IGetTokenApplication {
  constructor(
    @Inject(TokenTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly tokenRepository: ITokenRepository,
  ) {}

  public async execute(id: string, request: RequestModel): Promise<Token> {
    const { clientId } = request.admin   

    try {
      const token = await this.tokenRepository.findOne(
        { $and: [ { _id: id }, { clientId } ] },  
        [ { path: 'applicabilities' }, { path: 'operations' } ]
      );
      if (!token) throw new BadRequestException('El token no existe');

      return token;

    } catch(error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
