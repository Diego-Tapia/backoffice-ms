import { Inject, Injectable } from "@nestjs/common";
import { BlockchainTypes } from "src/features/shared/blockchain/infrastructure/service/blockchain.types";
import { IBlockhainWalletServices } from "src/features/shared/blockchain/infrastructure/service/wallet/blockchain-wallet.interface";
import { IGetBalancesApplication } from "./get-balances.app.interface";
import { IGetBalances } from "../../domain/interfaces/getbalances.interface";
import { Wallet } from "../../domain/entities/wallet.entity";


@Injectable()
export class GetBalancesApplication implements IGetBalancesApplication {

  constructor(
      @Inject(BlockchainTypes.INFRASTRUCTURE.WALLET) 
      private readonly blockchainService: IBlockhainWalletServices
  ) {}

  public async execute(wallet_id: string): Promise<IGetBalances> {
    const wallet:Wallet = await this.blockchainService.findOne(wallet_id)    
    let total: number = 0;
    wallet.balances.forEach( singleBalance => total+= +singleBalance.amount )
    return { total, balances: wallet.balances }
  }
}
