import { BadRequestException, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { WalletsByClientsTypes } from 'src/features/wallestByClients/walletsByClients.types';
import { WalletTypes } from 'src/features/wallet/wallet.type';
import { IWalletRepository } from 'src/features/wallet/infrastructure/repositories/wallet-repository.interface';
import { IWalletsByClientsRepository } from 'src/features/wallestByClients/infrastructure/repositories/walletsByClients-repository.interface';
import { IBalances } from 'src/features/wallet/domain/interfaces/balances.interface';
import configs from 'src/configs/environments/configs';
import { ConfigType } from '@nestjs/config';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { Transaction } from 'src/features/transaction/domain/entities/transaction.entity';
import { ETransactionTypes } from 'src/features/transaction_type/domain/enums/transaction-types.enum';
import { UserTypes } from 'src/features/user/user.types';
import { IUserRepository } from 'src/features/user/infrastructure/repositories/user-reposiory.interface';
import { UserProfileTypes } from 'src/features/user_profile/user.types';
import { IUserProfileRepository } from 'src/features/user_profile/infrastructure/repositories/user-repository.interface';
import { BlockchainTypes } from 'src/features/shared/blockchain/infrastructure/service/blockchain.types';
import { MassiveDecreaseTypes } from '../../massive-decrease.types';
import { IProcessMassiveDecreaseApplication } from './process-massive-decrease-app.interface';
import { IMassiveDecreaseRepository } from '../../infrastructure/repositories/massive-decrease-repository.interface';
import { MassiveDecreaseDto } from '../../infrastructure/dtos/massive-decrease.dto';
import { EMassiveDecreaseStatus } from '../../domain/enums/massive-decrease-status.enum';
import { MassiveIncrease } from 'src/features/massive_increase/domain/entities/massive-increase.entity';
import { MassiveDecrease } from '../../domain/entities/massive-decrease.entity';
import { EMassiveIncreaseStatus } from 'src/features/massive_increase/domain/enums/massive-increase-status.enum';
import { IMassiveIncreaseRepository } from 'src/features/massive_increase/infrastructure/repositories/massive-increase-repository.interface';
import { MassiveIncreaseTypes } from 'src/features/massive_increase/massive-increase.types';
import { EMassiveDecreaseDetailStatus } from '../../domain/enums/massive.decrease-detail-status.enum';
import { ITransactionTypeRepository } from 'src/features/transaction_type/infrastructure/repositories/transaction-type-repository.interfase';
import { TransactionTypeTypes } from 'src/features/transaction_type/transaction-type.types';
import { IBlockhainWalletServices } from 'src/features/shared/blockchain/infrastructure/service/wallet/blockchain-wallet.interface';
import { Wallet } from 'src/features/wallet/domain/entities/wallet.entity';

export class ProcessMassiveDecreaseApplication implements IProcessMassiveDecreaseApplication {
  constructor(
    @Inject(MassiveIncreaseTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly massiveIncreaseRepository: IMassiveIncreaseRepository,
    @Inject(MassiveDecreaseTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly massiveDecreaseRepository: IMassiveDecreaseRepository,
    @Inject(WalletsByClientsTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletsByClientsRepository: IWalletsByClientsRepository,
    @Inject(WalletTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletRepository: IWalletRepository,
    @Inject(UserTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(UserProfileTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly userProfileRepository:IUserProfileRepository,
    @Inject(TransactionTypeTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly transactionTypeRepository: ITransactionTypeRepository,
    @Inject(BlockchainTypes.INFRASTRUCTURE.WALLET)
    private readonly blockchainWalletService: IBlockhainWalletServices,
    @Inject(configs.KEY)
    private readonly configService: ConfigType<typeof configs>,
  ) {}

  async execute(massiveDecreaseDto: MassiveDecreaseDto, req: RequestModel) {
    const { clientId } = req.admin;
    const { massiveDecreaseId } = massiveDecreaseDto;
    if (!massiveDecreaseId) throw new BadRequestException('massiveDecreaseId is required');

    try {
      let massiveDecrease = await this.massiveDecreaseRepository.findById(massiveDecreaseId);
      if (massiveDecrease.status !== EMassiveDecreaseStatus.READY_PROCESS) throw new BadRequestException(`the status of the massive decrease should be ${ EMassiveDecreaseStatus.READY_PROCESS }`);

      const increasesAndDecreasesInProgress = await this.findAllIncreasesAndDecreasesInProcessByClientId(clientId);
      if (increasesAndDecreasesInProgress.length > 0) throw new BadRequestException('there is already a running process');

      const walletClient = await this.walletsByClientsRepository.findOne({ clientId });
      if (!walletClient) throw new BadRequestException(`the WalletByClient with the clientId "${clientId}" not exist`);
    
      const mainWallet = await this.walletRepository.findById(walletClient.walletId);
      if (!mainWallet) throw new BadRequestException(`the wallet with the id "${walletClient.walletId}" not exist`);

      massiveDecrease = await this.massiveDecreaseRepository.update(massiveDecreaseId, { status: EMassiveDecreaseStatus.PROCESSING })
      
      for (let detail of massiveDecrease.detail) {

        if (detail.status === EMassiveDecreaseDetailStatus.INVALID) continue;
        
        let userProfile = (typeof detail.userId === 'string') 
          ? await this.userProfileRepository.findOneQuery({ userId: String(detail.userId) })
          : null;
        if (!userProfile && !isNaN(Number(detail.userId))) userProfile = await this.userProfileRepository.findOneQuery({ cuil: Number(detail.userId) });
        if (!userProfile && !isNaN(Number(detail.userId))) userProfile = await this.userProfileRepository.findOneQuery({ dni: Number(detail.userId) }); 
        
        const user = (userProfile) ? await this.userRepository.findOneQuery({ _id: userProfile.userId }) : null;
          
        if (!user) {
          detail.error.push('El usuario no existe');
          detail.status = EMassiveDecreaseDetailStatus.INVALID
          massiveDecrease.recordLengthValidatedOk--;
          massiveDecrease.recordLengthValidatedError++;
          massiveDecrease.totalAmountValidated - detail.amount
          continue;
        }

        let userWallet: Wallet;
        if(!user.walletId){
          userWallet = await this.blockchainWalletService.create();
          await this.userRepository.updateQuery(user._id, { walletId: userWallet.id });
        }else{
          userWallet = await this.walletRepository.findById(user.walletId);
        }

        const balanceUserWalletByTokenId = userWallet.balances
          .filter((balance: IBalances) => balance.tokenId === massiveDecrease.tokenId)
          .map((balance) => balance.amount)
          .reduce((pre, curr) => pre + curr, 0);

        if (balanceUserWalletByTokenId < detail.amount) {
          detail.error.push('Saldo insuficiente');
          detail.status = EMassiveDecreaseDetailStatus.INVALID
          massiveDecrease.recordLengthValidatedOk--;
          massiveDecrease.recordLengthValidatedError++;
          massiveDecrease.totalAmountValidated - detail.amount
          continue;
        }

        const transactionType = await this.transactionTypeRepository.findOne({name: ETransactionTypes.DECREASE})

        const transaction = new Transaction({
          hash: 'HASH',
          amount: detail.amount,
          notes: detail.note,
          token: massiveDecrease.tokenId,
          userId: req.admin.id,
          transactionType: transactionType.id,
          walletFrom: userWallet.id,
          walletTo: mainWallet.id,
        });
        
        const SQSTransaction = {
          ...transaction,
          walletFromAddress: userWallet.address,
          walletToAddress: mainWallet.address,
          massiveDecreaseId,
          detailId: detail.id
        }

        // SQS
        const config = {
          endpoint: process.env.NODE_ENV !== 'production' ? this.configService.sqs.sqs_endpoint_url : undefined,
          region: process.env.REGION,
          credentials: {
            accessKeyId: this.configService.sqs.accesKeyId,
            secretAccessKey: this.configService.sqs.secretAccessKey,
          },
        };
    
        const sqsClient = new SQSClient(config);
    
        const params = {
          MessageBody: JSON.stringify(SQSTransaction),
          QueueUrl: this.configService.sqs.url_t,
        };
    
        const run = async () => {
          await sqsClient.send(new SendMessageCommand(params));
        };

        run();

      }
 
      if (massiveDecrease.recordLengthValidatedOk === 0) massiveDecrease.status = EMassiveDecreaseStatus.INVALID
      return await this.massiveDecreaseRepository.update(massiveDecreaseId, massiveDecrease);  
      
    } catch (error) {
      throw new HttpException(error.message || 'Server error in application process-massive-decreases', error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
    
  }

  private async findAllIncreasesAndDecreasesInProcessByClientId(clientId: string): Promise<Array<MassiveIncrease | MassiveDecrease>> {
    const massiveIncreases: Array<MassiveIncrease> = await this.massiveIncreaseRepository.findAll({clientId})
    const massiveDecreases: Array<MassiveDecrease> = await this.massiveDecreaseRepository.findAll({clientId})
    const massiveIncreasesInProcess: Array<MassiveIncrease> = massiveIncreases.filter(massiveIncrease => massiveIncrease.status === EMassiveIncreaseStatus.PROCESSING);
    const massiveDecreasesInProcess: Array<MassiveDecrease> = massiveDecreases.filter(massiveDecrease => massiveDecrease.status === EMassiveDecreaseStatus.PROCESSING)
    return [...massiveIncreasesInProcess, ...massiveDecreasesInProcess]
  }
}