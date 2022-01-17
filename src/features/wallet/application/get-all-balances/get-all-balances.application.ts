import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IGetBalances } from "../../domain/interfaces/getbalances.interface";
import { IWalletRepository } from "../../infrastructure/repositories/wallet-repository.interface";
import { RequestModel } from "src/features/admin/infrastructure/service/middleware/admin.middleware";
import { IGetAllBalancesApplication } from "./get-all-balances-app.interface";
import { WalletTypes } from "../../wallet.type";
import { IWalletsByClientsRepository } from "src/features/wallestByClients/infrastructure/repositories/walletsByClients-repository.interface";
import { WalletsByClientsTypes } from "src/features/wallestByClients/walletsByclients.types";
import { WalletsByClients } from "src/features/wallestByClients/domain/walletsByclients.entity";
import { Wallet } from "../../domain/entities/wallet.entity";


@Injectable()
export class GetAllBalancesApplication implements IGetAllBalancesApplication {

  constructor(
    @Inject(WalletTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletRepository: IWalletRepository,
    @Inject(WalletsByClientsTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletsByClientsRepository: IWalletsByClientsRepository
  ) {}

  public async execute(req: RequestModel): Promise<IGetBalances> {
    const { clientId } = req.admin
    const walletByClient: WalletsByClients = await this.walletsByClientsRepository.findOne({clientId})
    const wallet: Wallet = await this.walletRepository.findById(walletByClient.walletId as string, { path: 'balances.tokenId' })

    if (!wallet) throw new HttpException('Wallet not found', HttpStatus.NOT_FOUND)
    let total: number = 0;
    wallet.balances.forEach(singleBalance => total += +singleBalance.amount)
    return { total, balances: wallet.balances }
  }
}
