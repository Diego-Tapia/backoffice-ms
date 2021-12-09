import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import configs from "src/configs/environments/configs";
import { BlockchainTypes } from "src/features/shared/blockchain/infrastructure/service/blockchain.types";
import { IBlockchainTransactionService } from "src/features/shared/blockchain/infrastructure/service/transaction/blockchain-transaction-service.interface";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
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

@Injectable()
export class IndividualDecrementApplication implements IIndividualDecrementApplication {
  
  private total: number;
  private userWallet: Wallet;
  private mainWallet: Wallet;

  constructor(
    @Inject(BlockchainTypes.INFRASTRUCTURE.TRANSACTION)
    private readonly blockchainTransactionService: IBlockchainTransactionService,
    @Inject(WalletTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletRepository: IWalletRepository,
    @Inject(WalletsByClientsTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletByClientRepository: IWalletsByClientsRepository,
    @Inject(WalletTypes.APPLICATION.GET_BALANCES)
    private readonly getBalances: IGetBalancesApplication,
    @Inject(UserTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(configs.KEY)
    private readonly configService: ConfigType<typeof configs>
  ) {}

  async execute(individualDecrementDto:IndividualDecrementDto, request: RequestModel) : Promise<Transaction>{

    //USER
    const user = await this.userRepository.findOne(individualDecrementDto.userName);
    if(!user)  throw new HttpException('USER NOT-FOUND', HttpStatus.NOT_FOUND);
    if(!user.walletId) throw new HttpException('THIS USER HAS NO WALLET', HttpStatus.FORBIDDEN);
    this.userWallet = await this.walletRepository.findById(user.walletId);

    //ADMIN
    const { walletId } = await this.walletByClientRepository.findById(request.admin.id)
    this.mainWallet = await this.walletRepository.findById(walletId);

    //CHECK BALANCE
    const { balances } = await this.getBalances.execute(this.userWallet.id);
    balances.forEach(balance => {
      if(balance.tokenId === individualDecrementDto.tokenId) this.total = balance.amount;
    })
    if(this.total < individualDecrementDto.amount) throw new HttpException('THE USER WALLET HAS INSUFFICIENT FUNDS', HttpStatus.FORBIDDEN);

    const transaction = new Transaction({
      hash: 'HASH', 
      amount: individualDecrementDto.amount,
      notes: individualDecrementDto.notes, 
      token: individualDecrementDto.tokenId,
      userId: request.admin.id,
      transactionType: ETransactionTypes.DECREASE,
      walletFrom: this.userWallet.id,
      walletTo: this.mainWallet.id
    });

    //SQS
    const config = {
      endpoint: this.configService.sqs.host,
      region: process.env.REGION,
      credentials: {
        accessKeyId: this.configService.sqs.accesKeyId,
        secretAccessKey: this.configService.sqs.secretAccessKey,
      }
    };

    const sqsClient = new SQSClient(config);

    const SQSTransaction = {
      ...transaction,
      walletFromAddress: this.userWallet.address,
      walletToAddress: this.mainWallet.address,
    }
    
    const params = {
      MessageBody: JSON.stringify(SQSTransaction),
      QueueUrl: this.configService.sqs.url_t,
    };

    const run = async () => {
      try {
        await sqsClient.send(new SendMessageCommand(params));
        return this.blockchainTransactionService.create(transaction);
      } catch (err) {
        throw new Error(err.message);
      }
    };
    return run();
  }

}