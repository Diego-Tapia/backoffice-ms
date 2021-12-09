import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { AxiosInstance } from "axios";
import configs from "src/configs/environments/configs";
import { LibrariesTypes } from "src/features/shared/libraries/libraries.types";
import { Wallet } from "src/features/wallet/domain/entities/wallet.entity";
import { IBalances } from "src/features/wallet/domain/interfaces/balances.interface";
import { IBlockhainWalletServices } from "./blockchain-wallet.interface";


@Injectable()
export class BlockchainWalletService implements IBlockhainWalletServices{

  private BLOCKCHAIN_URL: string;

  constructor(
    @Inject(configs.KEY) private readonly configService: ConfigType<typeof configs>,
    @Inject(LibrariesTypes.AXIOS) private readonly axios: AxiosInstance

  ) {
    this.BLOCKCHAIN_URL = this.configService.blockchain_ms.url
  }

  async create(): Promise<Wallet>{
    try { 
      const response = await this.axios.post(`${this.BLOCKCHAIN_URL}/wallet`) 
      return response.data ? response.data : null;
    } catch (error) {
      console.log("Error creating wallet blockchain-service",error.message)
    }
  }

  async findOne(wallet_id: string): Promise<Wallet>{    
    try { 
      // const response = await this.axios.get(`${this.BLOCKCHAIN_URL}/wallet/${wallet_id}`)
      // return response ? response.data : null;
      return {
        address: "testUserAddress",
        privateKey: "testPK",
        balances: [{
          tokenId: "6182ab47b653ae9f99f3e524",
          amount: 5000
        }]
      }
    } catch (error) {
      console.log("Error finding wallet blockchain-service",error.message)
    }
  }
}