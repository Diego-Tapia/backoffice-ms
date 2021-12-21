import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { AxiosInstance } from "axios";
import configs from "src/configs/environments/configs";
import { LibrariesTypes } from "src/features/shared/libraries/libraries.types";
import { Token } from "src/features/token/domain/entities/token.entity";
import { AxiosException } from "../errors/axios.exception";
import { IBlockchainTokenService } from "./blockchain-token-service.interface";

@Injectable()
export class BlockchainTokenService implements IBlockchainTokenService {
  private BLOCKCHAIN_URL: string;

  constructor(
    @Inject(configs.KEY) private readonly configService: ConfigType<typeof configs>,
    @Inject(LibrariesTypes.AXIOS) private readonly axios: AxiosInstance

  ) {
    this.BLOCKCHAIN_URL = this.configService.blockchain_ms.url
  }

  async emitToken(tokenId: string, idAdmin: string): Promise<Token>{
    try {
      return await this.axios.post(`${this.BLOCKCHAIN_URL}/token/${tokenId}/emit`, {idAdmin: idAdmin})
    } catch (error) {
      throw new AxiosException(error)
    }
  }

  async reemitToken(tokenId: string, idAdmin: string, amount: number): Promise<Token>{
    try {
      return await this.axios.post(`${this.BLOCKCHAIN_URL}/token/${tokenId}/reemit`, {idAdmin: idAdmin ,amount: amount})
    } catch (error) {
      throw new AxiosException(error)
    }
  }

}