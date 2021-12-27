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
import { User } from "src/features/user/domain/entities/user.entity";
import { UserProfile } from "src/features/user_profile/domain/entities/userProfile.entity";
import { UserProfileTypes } from "src/features/user_profile/user.types";
import { IUserProfileRepository } from "src/features/user_profile/infrastructure/repositories/user-repository.interface";
import { IBalances } from "src/features/wallet/domain/interfaces/balances.interface";

@Injectable()
export class IndividualDecrementApplication implements IIndividualDecrementApplication {
  constructor(
    @Inject(WalletTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletRepository: IWalletRepository,
    @Inject(WalletsByClientsTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletByClientRepository: IWalletsByClientsRepository,
    @Inject(WalletTypes.APPLICATION.GET_BALANCES)
    private readonly getBalances: IGetBalancesApplication,
    @Inject(UserTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(UserProfileTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userProfileRepository : IUserProfileRepository,
    @Inject(QueueEmitterTypes.APPLICATION.EMITTER_TRANSACTION)
    private readonly QueueEmitterTransactionApplication: IQueueEmitterTransactionApplication,
  ) { }

  async execute({userIdentifier, amount, notes, tokenId}: IndividualDecrementDto, request: RequestModel) {
    const { clientId } = request.admin;
    let userTemp: User;
    let userProfile: UserProfile
    let userWallet: Wallet;
    let mainWallet: Wallet;

    const isNumber = !isNaN(Number(userIdentifier)); 
    
    //USER
    if (isNumber) {
      userProfile = await this.userProfileRepository.findOneByParams(+userIdentifier)
    }

    if (!userProfile && !isNumber ) {
      userTemp = await this.userRepository.findOneByParams(userIdentifier);
    }
    
    const user =  userTemp || userProfile?.userId as User
    if (!user) throw new HttpException('USER NOT-FOUND', HttpStatus.NOT_FOUND);

    if (!user.walletId) throw new HttpException('THIS USER HAS NO WALLET', HttpStatus.NOT_FOUND);
    userWallet = await this.walletRepository.findById(user.walletId);
    if (!userWallet) throw new HttpException('THIS USER WALLET WAS NOT FOUND', HttpStatus.NOT_FOUND);
    //ADMIN
    const clientWallet = await this.walletByClientRepository.findOne({ clientId: clientId })
    if (!clientWallet) throw new HttpException(`The WalletByClient with the clientId "${clientId}" was not found`, HttpStatus.NOT_FOUND);
    mainWallet = await this.walletRepository.findById(clientWallet.walletId);
    if (!mainWallet) throw new HttpException(`The wallet with the id "${clientWallet.walletId}" was not found`, HttpStatus.NOT_FOUND);

    //CHECK BALANCE
    const { balances } = await this.getBalances.execute(userWallet.id);
    let balance: IBalances = balances.find(balance => balance.tokenId.toString() === tokenId);
    if (!balance) throw new HttpException('THE USER WALLET HAS INSUFFICIENT FUNDS', HttpStatus.FORBIDDEN);
    if (balance.amount < amount) throw new HttpException('THE USER WALLET HAS INSUFFICIENT FUNDS', HttpStatus.FORBIDDEN);

    const transaction = new Transaction({
      amount,
      notes,
      token: tokenId,
      user: request.admin.id,
      transactionType: ETransactionTypes.INDIVIDUAL_DECREASE,
      walletFrom: userWallet.id,
      walletTo: mainWallet.id
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