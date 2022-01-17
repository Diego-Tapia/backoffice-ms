import { BadRequestException, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { WalletsByClientsTypes } from 'src/features/wallestByClients/walletsByclients.types';
import { IMassiveIncreaseRepository } from '../../../infrastructure/repositories/massive-increase/massive-increase-repository.interface';
import { IProcessMassiveIncreaseApplication } from './process-massive-increase-app.interface';
import { WalletTypes } from 'src/features/wallet/wallet.type';
import { IWalletRepository } from 'src/features/wallet/infrastructure/repositories/wallet-repository.interface';
import { IWalletsByClientsRepository } from 'src/features/wallestByClients/infrastructure/repositories/walletsByClients-repository.interface';
import { Transaction } from 'src/features/transaction/domain/entities/transaction.entity';
import { ETransactionTypes } from 'src/features/transaction/domain/enums/transaction-types.enum';
import { UserTypes } from 'src/features/user/user.types';
import { IUserRepository } from 'src/features/user/infrastructure/repositories/user/user-reposiory.interface';
import { BlockchainTypes } from 'src/features/shared/blockchain/infrastructure/service/blockchain.types';
import { IMassiveDecreaseRepository } from 'src/features/transaction/infrastructure/repositories/massive-decrease/massive-decrease-repository.interface';
import { IBlockhainWalletServices } from 'src/features/shared/blockchain/infrastructure/service/wallet/blockchain-wallet.interface';
import { Wallet } from 'src/features/wallet/domain/entities/wallet.entity';
import { ITransactionQueueEmitterApplication } from 'src/features/transaction/application/transaction/transaction-queue-emmiter/transaction-queue-emitter-app.interface';
import { ITransactionQueueMessage } from 'src/features/transaction/domain/interfaces/transaction-queue-message.interface';
import { User } from 'src/features/user/domain/entities/user.entity';
import { IValidateUserApplication } from 'src/features/user/application/validate-user/validate-user-app.interface';
import { TokenTypes } from 'src/features/token/token.types';
import { ITokenRepository } from 'src/features/token/infrastructure/repositories/token-repository.interface';
import { TransactionTypes } from 'src/features/transaction/transaction.types';
import { CreateMassiveDto } from 'src/features/transaction/infrastructure/dtos/create-massive.dto';
import { EMassiveStatus } from 'src/features/transaction/domain/enums/massive-status.enum';
import { EMassiveDetailStatus } from 'src/features/transaction/domain/enums/massive-detail-status.enum';

export class ProcessMassiveIncreaseApplication implements IProcessMassiveIncreaseApplication {
  constructor(
    @Inject(TransactionTypes.INFRASTRUCTURE.MASSIVE_INCREASE_REPOSITORY)
    private readonly massiveIncreaseRepository: IMassiveIncreaseRepository,
    @Inject(TransactionTypes.INFRASTRUCTURE.MASSIVE_DECREASE_REPOSITORY)
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
    @Inject(TransactionTypes.APPLICATION.TRANSACTION_EMMITER)
    private readonly transactionQueueEmitterApplication: ITransactionQueueEmitterApplication,
    @Inject(TokenTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly tokenRepository: ITokenRepository,
  ) {}

  async execute(createMassiveDto: CreateMassiveDto, req: RequestModel) {
    const { clientId } = req.admin;

    const { massiveId } = createMassiveDto;
    if (!massiveId) throw new BadRequestException('massiveIncreaseId is required');

    try {
      let massiveIncrease = await this.massiveIncreaseRepository.findById(massiveId);
      if (massiveIncrease.status !== EMassiveStatus.READY_PROCESS) throw new BadRequestException(`the status of the massive increase should be ${ EMassiveStatus.READY_PROCESS }`);

      const token = await this.tokenRepository.findById(massiveIncrease.tokenId)
      if (!token) throw new BadRequestException('El activo no se encuentra');
      if (!token.isActive()) throw new BadRequestException('El estado del activo debe ser ACTIVE');

      if (await this.massivesInProgress(clientId)) throw new BadRequestException('there is already a running process')

      const walletClient = await this.walletsByClientsRepository.findOne({ clientId });
      if (!walletClient) throw new BadRequestException(`the WalletByClient with the clientId "${clientId}" not exist`);
    
      const mainWallet = await this.walletRepository.findById(walletClient.walletId as string);
      if (!mainWallet) throw new BadRequestException(`the wallet with the id "${walletClient.walletId}" not exist`);

      if (!mainWallet.hasEnoughFunds(massiveIncrease.tokenId, massiveIncrease.totalAmountValidated)) {
        throw new BadRequestException('Saldo insuficiente');
      }
      
      massiveIncrease = await this.massiveIncreaseRepository.update({_id: massiveId}, { status: EMassiveStatus.PROCESSING })

      for (let detail of massiveIncrease.detail) {

        if (detail.status === EMassiveDetailStatus.INVALID) continue;
        
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

        } catch (error) {
          detail.error.push(error.message);
          detail.status = EMassiveDetailStatus.INVALID
          massiveIncrease.recordLengthValidatedOk--;
          massiveIncrease.recordLengthValidatedError++;
          massiveIncrease.totalAmountValidated - detail.amount
          continue
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
          tokenId: transaction.token as string,
          userId: transaction.user as string,
          transactionType: transaction.transactionType as string,
          walletFrom: transaction.walletFrom as string,
          walletTo: transaction.walletTo as string,
          massiveIncreaseId: massiveId,
          detailId: detail.id
        }

        this.transactionQueueEmitterApplication.execute(transactionQueueMessage)
      }
      
      if (massiveIncrease.recordLengthValidatedOk === 0) massiveIncrease.status = EMassiveStatus.INVALID
      return await this.massiveIncreaseRepository.update({_id: massiveId}, massiveIncrease);  
      
    } catch (error) {
      throw new HttpException(error.message || 'Server error in application process-massive-increases', error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
    
  }

  private async massivesInProgress(clientId: string): Promise<boolean> {
    const massiveIncreases = await this.massiveIncreaseRepository.findOne({clientId, status: EMassiveStatus.PROCESSING})
    const massiveDecreases = await this.massiveDecreaseRepository.findOne({clientId, status: EMassiveStatus.PROCESSING})
    return (massiveIncreases || massiveDecreases) ? true : false;
  }
}