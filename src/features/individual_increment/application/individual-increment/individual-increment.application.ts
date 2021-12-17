import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";

import { BlockchainTypes } from "src/features/shared/blockchain/infrastructure/service/blockchain.types";
import { IBlockhainWalletServices } from "src/features/shared/blockchain/infrastructure/service/wallet/blockchain-wallet.interface";
import { Transaction } from "src/features/transaction/domain/entities/transaction.entity";
import { IUserRepository } from "src/features/user/infrastructure/repositories/user-reposiory.interface";
import { UserTypes } from "src/features/user/user.types";
import { IndividualIncrementDto } from "../../infrastructure/dtos/individual-increment.dto";
import { IIndividualIncrementApplication } from "./individual-increment-app.interface";
import { WalletTypes } from "src/features/wallet/wallet.type";
import { IGetBalancesApplication } from "src/features/wallet/application/get-all-balances/get-balances.app.interface";
import { IWalletRepository } from "src/features/wallet/infrastructure/repositories/wallet-repository.interface";
import { ETransactionTypes } from "src/features/transaction_type/domain/enums/transaction-types.enum";
import { WalletsByClientsTypes } from "src/features/wallestByClients/walletsByClients.types";
import { IWalletsByClientsRepository } from "src/features/wallestByClients/infrastructure/repositories/walletsByClients-repository.interface";
import { RequestModel } from "src/features/admin/infrastructure/service/middleware/admin.middleware";
import { Wallet } from "src/features/wallet/domain/entities/wallet.entity";
import { IQueueEmitterTransactionApplication } from "src/features/queue_emitter/application/transaction/queue-emitter-transaction-app.interface";
import { QueueEmitterTypes } from "src/features/queue_emitter/queue-emitter.types";

@Injectable()
export class IndividualIncrementApplication implements IIndividualIncrementApplication {

  private total: number;
  private userWallet: Wallet;
  private mainWallet: Wallet;

  constructor(
    @Inject(BlockchainTypes.INFRASTRUCTURE.WALLET)
    private readonly blockchainWalletService: IBlockhainWalletServices,
    @Inject(WalletTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletRepository: IWalletRepository,
    @Inject(WalletsByClientsTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletByClientRepository: IWalletsByClientsRepository,
    @Inject(WalletTypes.APPLICATION.GET_BALANCES)
    private readonly getBalances: IGetBalancesApplication,
    @Inject(UserTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(QueueEmitterTypes.APPLICATION.EMITTER_TRANSACTION)
    private readonly QueueEmitterTransactionApplication: IQueueEmitterTransactionApplication,
  ) { }

  async execute(individualIncrementDto: IndividualIncrementDto, request: RequestModel) {
    const { clientId } = request.admin;

    //USER
    const user = await this.userRepository.findOne(individualIncrementDto.userName);
    if (!user) throw new HttpException('USER NOT-FOUND', HttpStatus.NOT_FOUND);
    if (!user.walletId) {
      this.userWallet = await this.blockchainWalletService.create();
      this.userRepository.updateQuery(user.id, { walletId: this.userWallet.id });
    }
    else this.userWallet = await this.walletRepository.findById(user.walletId);

    //ADMIN
    const clientWallet = await this.walletByClientRepository.findOne({ clientId: clientId })
    if (!clientWallet) throw new HttpException(`The WalletByClient with the clientId "${clientId}" was not found`, HttpStatus.NOT_FOUND);
    this.mainWallet = await this.walletRepository.findById(clientWallet.walletId);
    if (!this.mainWallet) throw new HttpException(`The wallet with the id "${clientWallet.walletId}" was not found`, HttpStatus.NOT_FOUND);


    //CHECK BALANCE
    const { balances } = await this.getBalances.execute(this.mainWallet.id);
    balances.forEach(balance => {
      if (balance.tokenId === individualIncrementDto.tokenId) this.total = balance.amount;
    })
    if (this.total < individualIncrementDto.amount) throw new HttpException('THE MAIN WALLET HAS INSUFFICIENT FUNDS', HttpStatus.FORBIDDEN);

    const transaction = new Transaction({
      amount: individualIncrementDto.amount,
      notes: individualIncrementDto.notes,
      token: individualIncrementDto.tokenId,
      user: request.admin.id,
      transactionType: ETransactionTypes.INDIVIDUAL_INCREASE,
      walletFrom: this.mainWallet.id,
      walletTo: this.userWallet.id
    });

    //SQS
    const SQSTransaction = {
      ...transaction,
      tokenId: transaction.token,
      userId: transaction.user
    }

    this.QueueEmitterTransactionApplication.execute(SQSTransaction)
  }

}