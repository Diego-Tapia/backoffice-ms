import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { ClientTypes } from 'src/features/client/client.types';
import { Client } from 'src/features/client/domain/entities/client.entity';
import { IClientRepository } from 'src/features/client/infrastructure/repositories/client-repository.interface';
import { Transaction } from 'src/features/transaction/domain/entities/transaction.entity';
import { ITransactionTypeRepository } from 'src/features/transaction/infrastructure/repositories/transaction-type/transaction-type-repository.interfase';
import { ITransactionRepository } from 'src/features/transaction/infrastructure/repositories/transaction/transaction-repository.interface';
import { TransactionTypes } from 'src/features/transaction/transaction.types';
import { UserProfile } from 'src/features/user/domain/entities/user-profile.entity';
import { User } from 'src/features/user/domain/entities/user.entity';
import { IUserProfileRepository } from 'src/features/user/infrastructure/repositories/user-profile/user-profile-repository.interface';
import { IUserRepository } from 'src/features/user/infrastructure/repositories/user/user-reposiory.interface';
import { UserTypes } from 'src/features/user/user.types';
import { WalletsByClients } from 'src/features/wallestByClients/domain/walletsByclients.entity';
import { IWalletsByClientsRepository } from 'src/features/wallestByClients/infrastructure/repositories/walletsByClients-repository.interface';
import { WalletsByClientsTypes } from 'src/features/wallestByClients/walletsByclients.types';
import { IGetTransactionByIdApplication } from './get-transaction-by-id-app.interface';

@Injectable()
export class GetTransactionByIdApplication implements IGetTransactionByIdApplication {
  constructor(
    @Inject(TransactionTypes.INFRASTRUCTURE.TRANSACTION_REPOSITORY)
    private readonly transactionRepository: ITransactionRepository,
    @Inject(UserTypes.INFRASTRUCTURE.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(UserTypes.INFRASTRUCTURE.USER_PROFILE_REPOSITORY)
    private readonly userProfileRepository: IUserProfileRepository,
    @Inject(ClientTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly clientRepository: IClientRepository,
    @Inject(TransactionTypes.INFRASTRUCTURE.TRANSACTION_TYPE_REPOSITORY)
    private readonly transactionTypeRepository: ITransactionTypeRepository,
    @Inject(WalletsByClientsTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletsByClientsRepository: IWalletsByClientsRepository
  ) {}

  public async execute(id: string, req: RequestModel): Promise<Transaction> {
    const { clientId } = req.admin;
    const transaction = await this.transactionRepository.findById(
      id,
      [ 
        { path: 'transactionTypeId' }, 
        { path: 'tokenId' },
      ]
    )
    if (!transaction) throw new BadRequestException('La transacción no existe')

    transaction.destination = await this.findDestination(transaction.walletTo as string);

    return transaction;
  }

  async findDestination(id: string): Promise<UserProfile | Client> {
    try {
      let destination: User | WalletsByClients
  
      destination = await this.userRepository.findOne({walletId: id});
      if (destination) {
        return await this.userProfileRepository.findOne(
          { userId: destination.id },
          {path: 'userId'}
        )
      } 
      destination = await this.walletsByClientsRepository.findOne({ walletId: id })
      return await this.clientRepository.findOne({ _id: destination.clientId })
    } catch (error) {
      throw new BadRequestException('error in getAllTransactionApplication')      
    }
  }
}

