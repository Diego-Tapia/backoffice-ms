import { Injectable, Inject, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { ETokenStatus } from 'src/features/token/domain/enums/token-status.enum';
import { Token } from '../../domain/entities/token.entity';
import { CreateTokenDto } from '../../infrastructure/dtos/create-token.dto';
import { ITokenRepository } from '../../infrastructure/repositories/token-repository.interface';
import { TokenTypes } from '../../token.types';
import { ICreateTokenApplication } from './create-token-app.interface';

@Injectable()
export class CreateTokenApplication implements ICreateTokenApplication {
  constructor(
    @Inject(TokenTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly tokenRepository: ITokenRepository,
  ) {}

  public async execute(createTokenDto: CreateTokenDto, req: RequestModel): Promise<Token> {
    const { clientId } = req.admin;
    
    const validateUniqueValues = await this.validateUniqueValues(clientId, createTokenDto);
    if(validateUniqueValues) throw new BadRequestException(validateUniqueValues)
    
    try {
      const bcItemId = await this.generateBcItemId();
      const token = new Token({
        ...createTokenDto,
        bcItemId,
        emited: false,
        status: ETokenStatus.INACTIVE,
        clientId,
      })
      return this.tokenRepository.create(
        token,
        [ { path: 'applicabilities' }, { path: 'operations' }]
      )
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  private async validateUniqueValues(clientId: string, createTokenDto: CreateTokenDto): Promise<String[]> {
    const { shortName, symbol } = createTokenDto;
    let errorMessage: string[] = [];

    try {
      const token = await this.tokenRepository.findOne(
        { $and: [ { clientId }, { $or: [ { shortName }, { symbol } ] } ] }
      );

      if(token?.symbol === symbol) errorMessage.push('El symbol ya se ecuentra en uso.');
      if(token?.shortName === shortName ) errorMessage.push('El shorName ya se ecuentra en uso');

      return (errorMessage.length) ? errorMessage : null;

    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async generateBcItemId(): Promise<number> {
    const lastTokenCreated = await this.tokenRepository.findLastCreated();
    return lastTokenCreated ? lastTokenCreated.bcItemId+1 : 1;
  }
}
