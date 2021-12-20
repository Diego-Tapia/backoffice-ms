import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { AxiosInstance } from "axios";
import configs from "src/configs/environments/configs";
import { LibrariesTypes } from "src/features/shared/libraries/libraries.types";
import { Wallet } from "src/features/wallet/domain/entities/wallet.entity";
import { AxiosException } from "../errors/axios.exception";
import { IBlockhainWalletServices } from "./blockchain-wallet.interface";


@Injectable()
export class BlockchainWalletService implements IBlockhainWalletServices{

  private BLOCKCHAIN_URL: string;

  constructor(
    @Inject(configs.KEY) private readonly configService: ConfigType<typeof configs>,
    @Inject(LibrariesTypes.AXIOS) private readonly axios: AxiosInstance,

  ) {
    this.BLOCKCHAIN_URL = this.configService.blockchain_ms.url
  }

  async create(): Promise<Wallet>{
    try { 
      const { data } = await this.axios.post(`${this.BLOCKCHAIN_URL}/wallet`) 
      return data ? data : null;
    } catch (error) {
      throw new AxiosException(error)
    }
  }

  async findById(walletId: string): Promise<Wallet>{    
    try { 
      const { data } = await this.axios.get(`${this.BLOCKCHAIN_URL}/wallet/${walletId}`)
      return data ? data : null;
    } catch (error) {
      console.log("Error finding wallet blockchain-service",error.message)
      throw new AxiosException(error)
    }
  }
}