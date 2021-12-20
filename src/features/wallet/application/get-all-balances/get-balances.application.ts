import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IGetBalancesApplication } from "./get-balances.app.interface";
import { IGetBalances } from "../../domain/interfaces/getbalances.interface";
import { Wallet } from "../../domain/entities/wallet.entity";
import { WalletTypes } from "../../wallet.type";
import { IWalletRepository } from "../../infrastructure/repositories/wallet-repository.interface";


@Injectable()
export class GetBalancesApplication implements IGetBalancesApplication {

  constructor(
    @Inject(WalletTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletRepository: IWalletRepository
  ) {}

  public async execute(walletId: string): Promise<IGetBalances> {
    const wallet: Wallet = await this.walletRepository.findById(walletId)
    if (!wallet) throw new HttpException('Wallet not found', HttpStatus.NOT_FOUND)
    let total: number = 0;
    wallet.balances.forEach(singleBalance => total += +singleBalance.amount)
    return { total, balances: wallet.balances }
  }
}
