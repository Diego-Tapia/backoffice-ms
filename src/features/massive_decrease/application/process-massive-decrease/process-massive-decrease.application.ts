import { BadRequestException, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { WalletsByClientsTypes } from 'src/features/wallestByClients/walletsByClients.types';
import { WalletTypes } from 'src/features/wallet/wallet.type';
import { IWalletRepository } from 'src/features/wallet/infrastructure/repositories/wallet-repository.interface';
import { IWalletsByClientsRepository } from 'src/features/wallestByClients/infrastructure/repositories/walletsByClients-repository.interface';
import { Transaction } from 'src/features/transaction/domain/entities/transaction.entity';
import { ETransactionTypes } from 'src/features/transaction_type/domain/enums/transaction-types.enum';
import { UserTypes } from 'src/features/user/user.types';
import { IUserRepository } from 'src/features/user/infrastructure/repositories/user/user-reposiory.interface';
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
import { IBlockhainWalletServices } from 'src/features/shared/blockchain/infrastructure/service/wallet/blockchain-wallet.interface';
import { Wallet } from 'src/features/wallet/domain/entities/wallet.entity';
import { QueueEmitterTypes } from 'src/features/queue_emitter/queue-emitter.types';
import { IQueueEmitterTransactionApplication } from 'src/features/queue_emitter/application/transaction/queue-emitter-transaction-app.interface';
import { ITransactionQueueMessage } from 'src/features/queue_emitter/domain/interfaces/transaction-queue-message.interface';
import { User } from 'src/features/user/domain/entities/user.entity';
import { IValidateUserApplication } from 'src/features/user/application/validate-user/validate-user-app.interface';

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
    @Inject(UserTypes.INFRASTRUCTURE.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(UserTypes.APPLICATION.VALIDATE_USER)
    private readonly validateUserApplication: IValidateUserApplication,
    @Inject(BlockchainTypes.INFRASTRUCTURE.WALLET)
    private readonly blockchainWalletService: IBlockhainWalletServices,
    @Inject(QueueEmitterTypes.APPLICATION.EMITTER_TRANSACTION)
    private readonly QueueEmitterTransactionApplication: IQueueEmitterTransactionApplication
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
        
        let userWallet: Wallet;

        try {
          const userProfile = await this.validateUserApplication.execute(String(detail.userId), req);
          const user = userProfile?.userId as User

          if(!user.walletId){
            userWallet = await this.blockchainWalletService.create();
            await this.userRepository.update({_id: user.id}, { walletId: userWallet.id });
          }else{
            userWallet = await this.walletRepository.findById(user.walletId as string);
          }

          if (!userWallet.hasEnoughFunds(massiveDecrease.tokenId, detail.amount)) {
            throw new Error('Saldo insuficiente')
          }

        } catch (error) {
          detail.error.push(error.message);
          detail.status = EMassiveDecreaseDetailStatus.INVALID
          massiveDecrease.recordLengthValidatedOk--;
          massiveDecrease.recordLengthValidatedError++;
          massiveDecrease.totalAmountValidated - detail.amount
          continue
        }

        const transaction = new Transaction({
          amount: detail.amount,
          notes: detail.note,
          token: massiveDecrease.tokenId,
          user: req.admin.id,
          transactionType: ETransactionTypes.MASSIVE_DECREMENT,
          walletFrom: userWallet.id,
          walletTo: mainWallet.id,
        });
        
        const transactionQueueMessage: ITransactionQueueMessage = {
          ...transaction,
          userId: transaction.user,
          tokenId: transaction.token,
          massiveDecreaseId,
          detailId: detail.id
        }

        this.QueueEmitterTransactionApplication.execute(transactionQueueMessage)
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