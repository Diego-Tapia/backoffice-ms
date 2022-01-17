import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { AxiosInstance } from "axios";
import configs from "src/configs/environments/configs";
import { LibrariesTypes } from "src/features/shared/libraries/libraries.types";
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

  async emitToken(tokenId: string, idAdmin: string, amount: number): Promise<void>{
    try {
      return await this.axios.post(`${this.BLOCKCHAIN_URL}/token/${tokenId}/emit`, {idAdmin, amount})
    } catch (error) {
      throw new AxiosException(error)
    }
  }

}