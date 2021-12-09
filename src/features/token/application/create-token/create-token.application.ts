import { Injectable, Inject, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { TokenStatus } from 'src/features/shared/interfaces/token-status.interface';
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
    
    const validateUniqueValues = await this.validateUniqueValuesByClientId(clientId, createTokenDto);
    if(validateUniqueValues) throw new BadRequestException(validateUniqueValues)
    
    try {
      const bcItemId = await this.generateBcItemId();
      const token = new Token({
        ...createTokenDto,
        bcItemId,
        emited: false,
        status: TokenStatus.INACTIVE,
        clientId,
      })
      return this.tokenRepository.create(token)
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  private async validateUniqueValuesByClientId(clientId: string, createTokenDto: CreateTokenDto): Promise<String[]> {
    const { shortName, symbol } = createTokenDto;
    let errorMessage: string[] = [];
    try {
      const tokens = await this.tokenRepository.findAll({clientId});
      const symbolExsit = tokens.filter(token => token.symbol === symbol).length > 0; 
      const shortNameExsit = tokens.filter(token => token.shortName === shortName).length > 0; 
      
      if( symbolExsit ) errorMessage.push('symbol already exists.');
      if( shortNameExsit ) errorMessage.push('shortName already exists.');
      return (errorMessage.length > 0) ? errorMessage : null;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async generateBcItemId(): Promise<number> {
    const lastTokenCreated = await this.tokenRepository.findLastCreated();
    return lastTokenCreated ? lastTokenCreated.bcItemId+1 : 1;
  }
}
