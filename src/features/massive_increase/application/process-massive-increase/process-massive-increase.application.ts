import { BadRequestException, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { WalletsByClientsTypes } from 'src/features/wallestByClients/walletsByClients.types';
import { MassiveIncrease } from '../../domain/entities/massive-increase.entity';
import { EMassiveIncreaseStatus } from '../../domain/enums/massive-increase-status.enum';
import { MassiveIncreaseDto } from '../../infrastructure/dtos/massive-increase.dto';
import { IMassiveIncreaseRepository } from '../../infrastructure/repositories/massive-increase-repository.interface';
import { MassiveIncreaseTypes } from '../../massive-increase.types';
import { IProcessMassiveIncreaseApplication } from './process-massive-increase-app.interface';
import { WalletTypes } from 'src/features/wallet/wallet.type';
import { IWalletRepository } from 'src/features/wallet/infrastructure/repositories/wallet-repository.interface';
import { IWalletsByClientsRepository } from 'src/features/wallestByClients/infrastructure/repositories/walletsByClients-repository.interface';
import { IBalances } from 'src/features/wallet/domain/interfaces/balances.interface';
import { Transaction } from 'src/features/transaction/domain/entities/transaction.entity';
import { ETransactionTypes } from 'src/features/transaction_type/domain/enums/transaction-types.enum';
import { UserTypes } from 'src/features/user/user.types';
import { IUserRepository } from 'src/features/user/infrastructure/repositories/user-reposiory.interface';
import { UserProfileTypes } from 'src/features/user_profile/user.types';
import { IUserProfileRepository } from 'src/features/user_profile/infrastructure/repositories/user-repository.interface';
import { BlockchainTypes } from 'src/features/shared/blockchain/infrastructure/service/blockchain.types';
import { EMassiveIncreaseDetailStatus } from '../../domain/enums/massive.increase-detail-status.enum';
import { MassiveDecrease } from 'src/features/massive_decrease/domain/entities/massive-decrease.entity';
import { MassiveDecreaseTypes } from 'src/features/massive_decrease/massive-decrease.types';
import { IMassiveDecreaseRepository } from 'src/features/massive_decrease/infrastructure/repositories/massive-decrease-repository.interface';
import { EMassiveDecreaseStatus } from 'src/features/massive_decrease/domain/enums/massive-decrease-status.enum';
import { IBlockhainWalletServices } from 'src/features/shared/blockchain/infrastructure/service/wallet/blockchain-wallet.interface';
import { Wallet } from 'src/features/wallet/domain/entities/wallet.entity';
import { QueueEmitterTypes } from 'src/features/queue_emitter/queue-emitter.types';
import { IQueueEmitterTransactionApplication } from 'src/features/queue_emitter/application/transaction/queue-emitter-transaction-app.interface';
import { ITransactionQueueMessage } from 'src/features/queue_emitter/domain/interfaces/transaction-queue-message.interface';

export class ProcessMassiveIncreaseApplication implements IProcessMassiveIncreaseApplication {
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
    @Inject(BlockchainTypes.INFRASTRUCTURE.WALLET)
    private readonly blockchainWalletService: IBlockhainWalletServices,
    @Inject(QueueEmitterTypes.APPLICATION.EMITTER_TRANSACTION)
    private readonly QueueEmitterTransactionApplication: IQueueEmitterTransactionApplication

  ) {}

  async execute(massiveIncreaseDto: MassiveIncreaseDto, req: RequestModel) {
    const { clientId } = req.admin;

    const { massiveIncreaseId } = massiveIncreaseDto;
    if (!massiveIncreaseId) throw new BadRequestException('massiveIncreaseId is required');

    try {
      let massiveIncrease = await this.massiveIncreaseRepository.findById(massiveIncreaseId);
      if (massiveIncrease.status !== EMassiveIncreaseStatus.READY_PROCESS) throw new BadRequestException(`the status of the massive increase should be ${ EMassiveIncreaseStatus.READY_PROCESS }`);

      const increasesAndDecreasesInProgress = await this.findAllIncreasesAndDecreasesInProcessByClientId(clientId);
      if (increasesAndDecreasesInProgress.length > 0) throw new BadRequestException('there is already a running process');

      const walletClient = await this.walletsByClientsRepository.findOne({ clientId });
      if (!walletClient) throw new BadRequestException(`the WalletByClient with the clientId "${clientId}" not exist`);
    
      const mainWallet = await this.walletRepository.findById(walletClient.walletId);
      if (!mainWallet) throw new BadRequestException(`the wallet with the id "${walletClient.walletId}" not exist`);

      const balanceMainWalletByTokenId = mainWallet.balances
        .filter((balance: IBalances) => balance.tokenId === massiveIncrease.tokenId)
        .map((balance) => balance.amount)
        .reduce((pre, curr) => pre + curr, 0);
      if (balanceMainWalletByTokenId < massiveIncrease.totalAmountValidated) throw new BadRequestException('insufficient amount');
      
      massiveIncrease = await this.massiveIncreaseRepository.update(massiveIncreaseId, { status: EMassiveIncreaseStatus.PROCESSING })

      for (let detail of massiveIncrease.detail) {

        if (detail.status === EMassiveIncreaseDetailStatus.INVALID) continue;

        let userProfile = (typeof detail.userId === 'string') 
          ? await this.userProfileRepository.findOneQuery({ userId: String(detail.userId) })
          : null;
        if (!userProfile && !isNaN(Number(detail.userId))) userProfile = await this.userProfileRepository.findOneQuery({ cuil: Number(detail.userId) });
        if (!userProfile && !isNaN(Number(detail.userId))) userProfile = await this.userProfileRepository.findOneQuery({ dni: Number(detail.userId) }); 
        
        const user = (userProfile) ? await this.userRepository.findOneQuery({ _id: userProfile.userId }) : null;
          
        if (!user) {
          detail.error.push('El usuario no existe');
          detail.status = EMassiveIncreaseDetailStatus.INVALID
          massiveIncrease.recordLengthValidatedOk--;
          massiveIncrease.recordLengthValidatedError++;
          massiveIncrease.totalAmountValidated - detail.amount
          continue;
        }

        
        let userWallet: Wallet;
        if(!user.walletId){
          userWallet = await this.blockchainWalletService.create();
          await this.userRepository.updateQuery(user.id, { walletId: userWallet.id });
        }else{
          userWallet = await this.walletRepository.findById(user.walletId);
        }

        const transaction = new Transaction({
          amount: detail.amount,
          notes: detail.note,
          token: massiveIncrease.tokenId,
          user: req.admin.id,
          transactionType: ETransactionTypes.MASSIVE_INCREMENT,
          walletFrom: mainWallet.id,
          walletTo: userWallet.id,
        });

        const transactionQueueMessage: ITransactionQueueMessage = {
          ...transaction,
          userId: transaction.user,
          tokenId: transaction.token,
          massiveIncreaseId,
          detailId: detail.id
        }
  
        this.QueueEmitterTransactionApplication.execute(transactionQueueMessage)

      }
      
      if(massiveIncrease.recordLengthValidatedOk === 0) {
        await this.massiveIncreaseRepository.update(massiveIncreaseId, { status: EMassiveIncreaseStatus.INVALID })
      }

      return await this.massiveIncreaseRepository.update(massiveIncreaseId, massiveIncrease);  
      
    } catch (error) {
      throw new HttpException(error.message || 'Server error in application process-massive-increases', error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
    
  }

  private async findAllIncreasesAndDecreasesInProcessByClientId(clientId: string): Promise<Array<MassiveIncrease | MassiveDecrease>> {
    const massiveIncreases: Array<MassiveIncrease> = await this.massiveIncreaseRepository.findAll({clientId});
    const massiveDecreases: Array<MassiveDecrease> = await this.massiveDecreaseRepository.findAll({clientId});
    const massiveIncreasesInProcess: Array<MassiveIncrease> = massiveIncreases.filter(massiveIncrease => massiveIncrease.status === EMassiveIncreaseStatus.PROCESSING);
    const massiveDecreasesInProcess: Array<MassiveDecrease> = massiveDecreases.filter(massiveDecrease => massiveDecrease.status === EMassiveDecreaseStatus.PROCESSING);
    return [...massiveIncreasesInProcess, ...massiveDecreasesInProcess]
  }
}