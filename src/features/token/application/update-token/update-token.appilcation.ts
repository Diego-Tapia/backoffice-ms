import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UpdateQuery } from "mongoose";
import { RequestModel } from "src/features/admin/infrastructure/service/middleware/admin.middleware";
import { UpdateTokenDto } from "../../infrastructure/dtos/update-token.dto";
import { TokenModel } from "../../infrastructure/models/token.model";
import { ITokenRepository } from "../../infrastructure/repositories/token-repository.interface";
import { TokenTypes } from "../../token.types";
import { IUpdateTokenApplication } from "./update-token-app.interface";

@Injectable()
export class UpdateTokenApplication implements IUpdateTokenApplication {
  constructor(
    @Inject(TokenTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly tokenRepository: ITokenRepository,
  ) {}

  public async execute(id: string, updateTokenDto: UpdateTokenDto, req: RequestModel) {
    const { shortName, symbol } = updateTokenDto;
    const { clientId } = req.admin;
    let errorMessage: string[] = [];
    
    try {
      // Verifica que no exista un token del mismo cliente con igual shorname o symbol 
      const token = await this.tokenRepository.findOne(
        { $and: [ { clientId }, { $or: [ { shortName }, { symbol } ] } ] }
      );
      if (shortName && token?.shortName === shortName) errorMessage.push('El symbol ya se ecuentra en uso.');
      if (symbol && token?.symbol === symbol) errorMessage.push('El shorName ya se ecuentra en uso');
      if (errorMessage.length) throw new BadRequestException(errorMessage) 

      const updateToken = await this.tokenRepository.update(
        { $and: [ { _id: id }, { clientId } ] }, 
        updateTokenDto as UpdateQuery<TokenModel>,
        [ { path: 'applicabilities' }, { path: 'operations' }]
      )
      if (!updateToken) throw new BadRequestException('El token no existe');
      
      return updateToken;

    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

