import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { RequestModel } from "src/features/admin/infrastructure/service/middleware/admin.middleware";
import { UpdateTokenDto } from "../../infrastructure/dtos/update-token.dto";
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
    const validateUniqueValues = ( shortName || symbol ) 
      ? await this.validateUniqueValuesByClientId(clientId, updateTokenDto)
      : null;
    if (validateUniqueValues) throw new BadRequestException(validateUniqueValues)
    
    try {
      return this.tokenRepository.update(id, {updateTokenDto})
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  private async validateUniqueValuesByClientId(clientId: string, updateTokenDto: UpdateTokenDto): Promise<string[]> {
    const { shortName, symbol } = updateTokenDto;
    let errorMessage: string[] = [];
    
    try {
      const tokens = await this.tokenRepository.findAll({ clientId });
      if(symbol) {
        const symbolExsit = tokens.filter(token => token.symbol === symbol).length > 0; 
        if (symbolExsit) errorMessage.push('symbol already exists.');
      }
      if (shortName) {
        const shortNameExsit = tokens.filter(token => token.shortName === shortName).length > 0; 
        if (shortNameExsit) errorMessage.push('shortName already exists.');
      }
      return (errorMessage.length > 0) ? errorMessage : null;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

