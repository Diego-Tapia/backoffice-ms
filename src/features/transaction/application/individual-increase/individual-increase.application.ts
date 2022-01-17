import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Transaction } from "src/features/transaction/domain/entities/transaction.entity";
import { IUserRepository } from "src/features/user/infrastructure/repositories/user/user-reposiory.interface";
import { UserTypes } from "src/features/user/user.types";
import { WalletTypes } from "src/features/wallet/wallet.type";
import { IGetBalancesApplication } from "src/features/wallet/application/get-balances/get-balances.app.interface";
import { IWalletRepository } from "src/features/wallet/infrastructure/repositories/wallet-repository.interface";
import { ETransactionTypes } from "src/features/transaction/domain/enums/transaction-types.enum";
import { WalletsByClientsTypes } from "src/features/wallestByClients/walletsByclients.types";
import { IWalletsByClientsRepository } from "src/features/wallestByClients/infrastructure/repositories/walletsByClients-repository.interface";
import { RequestModel } from "src/features/admin/infrastructure/service/middleware/admin.middleware";
import { Wallet } from "src/features/wallet/domain/entities/wallet.entity";
import { User } from "src/features/user/domain/entities/user.entity";
import { IBalances } from "src/features/wallet/domain/interfaces/balances.interface";
import { IValidateUserApplication } from "src/features/user/application/validate-user/validate-user-app.interface";
import { TokenTypes } from "src/features/token/token.types";
import { ITokenRepository } from "src/features/token/infrastructure/repositories/token-repository.interface";
import { CommonTypes } from "src/features/shared/common/common.types";
import { IHelperService } from "src/features/shared/common/infrastructure/services/helper-service/helper-service.interface";
import { CreateIndividualDto } from "../../infrastructure/dtos/create-individual.dto";
import { IIndividualIncreaseApplication } from "./individual-increase-app.interface";
import { TransactionTypes } from "../../transaction.types";
import { ITransactionQueueEmitterApplication } from "../transaction/transaction-queue-emmiter/transaction-queue-emitter-app.interface";
import { ITransactionQueueMessage } from "../../domain/interfaces/transaction-queue-message.interface";

@Injectable()
export class IndividualIncreaseApplication implements IIndividualIncreaseApplication {

  constructor(
    @Inject(WalletTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletRepository: IWalletRepository,
    @Inject(WalletsByClientsTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletByClientRepository: IWalletsByClientsRepository,
    @Inject(WalletTypes.APPLICATION.GET_BALANCES)
    private readonly getBalances: IGetBalancesApplication,
    @Inject(UserTypes.APPLICATION.VALIDATE_USER)
    private readonly validateUserApplication: IValidateUserApplication,
    @Inject(UserTypes.INFRASTRUCTURE.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(TokenTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly tokenRepository: ITokenRepository,
    @Inject(TransactionTypes.APPLICATION.TRANSACTION_EMMITER)
    private readonly transactionQueueEmitterApplication: ITransactionQueueEmitterApplication,
    @Inject(CommonTypes.INFRASTRUCTURE.HELPER_SERVICE)
    private readonly helperService: IHelperService,
  ) { }

  async execute({userIdentifier, amount, tokenId, notes}: CreateIndividualDto, request: RequestModel) {
    const { clientId } = request.admin;
    let userWallet: Wallet;
    let mainWallet: Wallet;

    if (!this.helperService.isValidObjectId(tokenId)) {
      throw new BadRequestException('id inválido');
    }
    const token = await this.tokenRepository.findById(tokenId)
    if (!token) throw new BadRequestException('El activo no se encuentra');
    if (!token.isActive()) throw new BadRequestException('El estado del activo debe ser ACTIVE');

    const userProfile = await this.validateUserApplication.execute(userIdentifier, request);
    const user = userProfile?.userId as User

    if (!user) throw new HttpException('USER NOT-FOUND', HttpStatus.NOT_FOUND);

    if (!user.walletId) {
      // TODO CREAR WALLET DESDE API BLOCKCHAIN-MS
      // userWallet = await this.blockchainWalletService.create();
      userWallet = await this.walletRepository.create()
      await this.userRepository.update({ _id: user.id }, { walletId: userWallet.id });
    }
    else userWallet = await this.walletRepository.findById(user.walletId as string);
    
    if (!userWallet) throw new HttpException('THIS USER WALLET WAS NOT FOUND', HttpStatus.NOT_FOUND);

    //ADMIN
    const clientWallet = await this.walletByClientRepository.findOne({ clientId: clientId })
    if (!clientWallet) throw new HttpException(`The WalletByClient with the clientId "${clientId}" was not found`, HttpStatus.NOT_FOUND);
    mainWallet = await this.walletRepository.findById(clientWallet.walletId as string);
    if (!mainWallet) throw new HttpException(`The wallet with the id "${clientWallet.walletId}" was not found`, HttpStatus.NOT_FOUND);

    //CHECK BALANCE
    const { balances } = await this.getBalances.execute(mainWallet.id);
    let balance: IBalances = balances.find(balance => balance.tokenId.toString() === tokenId);
    if (!balance) throw new HttpException('THE MAIN WALLET HAS INSUFFICIENT FUNDS', HttpStatus.FORBIDDEN);
    if (balance.amount < amount) throw new HttpException('THE MAIN WALLET HAS INSUFFICIENT FUNDS', HttpStatus.FORBIDDEN);

    const transaction = new Transaction({
      amount,
      notes,
      token: tokenId,
      user: request.admin.id,
      transactionType: ETransactionTypes.INDIVIDUAL_INCREASE,
      walletFrom: mainWallet.id,
      walletTo: userWallet.id
    });

    //SQS
      const transactionQueueMessage: ITransactionQueueMessage = {
      ...transaction,
      tokenId: transaction.token as string,
      userId: transaction.user as string,
      transactionType: transaction.transactionType as string,
      walletFrom: transaction.walletFrom as string,
      walletTo: transaction.walletTo as string,
    }

    this.transactionQueueEmitterApplication.execute(transactionQueueMessage)
  }

}