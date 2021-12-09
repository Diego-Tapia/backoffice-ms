import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import configs from "src/configs/environments/configs";
import { BlockchainTypes } from "src/features/shared/blockchain/infrastructure/service/blockchain.types";
import { IBlockchainTransactionService } from "src/features/shared/blockchain/infrastructure/service/transaction/blockchain-transaction-service.interface";
import { IBlockhainWalletServices } from "src/features/shared/blockchain/infrastructure/service/wallet/blockchain-wallet.interface";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
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

@Injectable()
export class IndividualIncrementApplication implements IIndividualIncrementApplication {

  private total: number;
  private userWallet: Wallet;
  private mainWallet: Wallet;

  constructor(
    @Inject(BlockchainTypes.INFRASTRUCTURE.TRANSACTION)
    private readonly blockchainTransactionService: IBlockchainTransactionService,
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
    @Inject(configs.KEY)
    private readonly configService: ConfigType<typeof configs>
  ) {}

  async execute(individualIncrementDto:IndividualIncrementDto, request: RequestModel) : Promise<Transaction>{  
    
    //USER
    const user = await this.userRepository.findOne(individualIncrementDto.userName);
    if(!user)  throw new HttpException('USER NOT-FOUND', HttpStatus.NOT_FOUND);
    if(!user.walletId){
      this.userWallet = await this.blockchainWalletService.create();
      this.userRepository.updateQuery(user._id, {walletId: this.userWallet.id});
    }else{
      this.userWallet = await this.walletRepository.findById(user.walletId);
    }
    
    //ADMIN
    const { walletId } = await this.walletByClientRepository.findById(request.admin.id)
    this.mainWallet = await this.walletRepository.findById(walletId);
    

    //CHECK BALANCE
    const { balances } = await this.getBalances.execute(this.mainWallet.id);
    balances.forEach(balance => {
      if(balance.tokenId === individualIncrementDto.tokenId) this.total = balance.amount;
    })
    if(this.total < individualIncrementDto.amount) throw new HttpException('THE MAIN WALLET HAS INSUFFICIENT FUNDS', HttpStatus.FORBIDDEN);

    const transaction = new Transaction({
      hash: 'HASH', 
      amount: individualIncrementDto.amount,
      notes: individualIncrementDto.notes, 
      token: individualIncrementDto.tokenId,
      userId: request.admin.id,
      transactionType: ETransactionTypes.INCREASE,
      walletFrom: this.mainWallet.id,
      walletTo: this.userWallet.id
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
      walletFromAddress: this.mainWallet.address,
      walletToAddress: this.userWallet.address,
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