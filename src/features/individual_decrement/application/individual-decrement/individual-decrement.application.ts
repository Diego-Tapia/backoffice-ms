import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Transaction } from "src/features/transaction/domain/entities/transaction.entity";
import { IUserRepository } from "src/features/user/infrastructure/repositories/user-reposiory.interface";
import { UserTypes } from "src/features/user/user.types";
import { IndividualDecrementDto } from "../../infrastructure/dtos/individual-decrement.dto";
import { IIndividualDecrementApplication } from "./individual-decrement-app.interface";
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
export class IndividualDecrementApplication implements IIndividualDecrementApplication {

  private total: number;
  private userWallet: Wallet;
  private mainWallet: Wallet;

  constructor(
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

  async execute(individualDecrementDto: IndividualDecrementDto, request: RequestModel) {
    const { clientId } = request.admin;

    //USER
    const user = await this.userRepository.findOne(individualDecrementDto.userName);
    if (!user) throw new HttpException('USER NOT-FOUND', HttpStatus.NOT_FOUND);
    if (!user.walletId) throw new HttpException('THIS USER HAS NO WALLET', HttpStatus.NOT_FOUND);
    this.userWallet = await this.walletRepository.findById(user.walletId);
    if (!this.userWallet) throw new HttpException('THIS USER WALLET WAS NOT FOUND', HttpStatus.NOT_FOUND);
    //ADMIN
    const clientWallet = await this.walletByClientRepository.findOne({ clientId: clientId })
    if (!clientWallet) throw new HttpException(`The WalletByClient with the clientId "${clientId}" was not found`, HttpStatus.NOT_FOUND);
    this.mainWallet = await this.walletRepository.findById(clientWallet.walletId);
    if (!this.mainWallet) throw new HttpException(`The wallet with the id "${clientWallet.walletId}" was not found`, HttpStatus.NOT_FOUND);

    //CHECK BALANCE
    const { balances } = await this.getBalances.execute(this.userWallet.id);
    balances.forEach(balance => {
      if (balance.tokenId === individualDecrementDto.tokenId) this.total = balance.amount;
    })
    if (this.total < individualDecrementDto.amount) throw new HttpException('THE USER WALLET HAS INSUFFICIENT FUNDS', HttpStatus.FORBIDDEN);

    const transaction = new Transaction({
      hash: 'HASH',
      amount: individualDecrementDto.amount,
      notes: individualDecrementDto.notes,
      token: individualDecrementDto.tokenId,
      user: request.admin.id,
      transactionType: ETransactionTypes.INDIVIDUAL_DECREASE,
      walletFrom: this.userWallet.id,
      walletTo: this.mainWallet.id
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