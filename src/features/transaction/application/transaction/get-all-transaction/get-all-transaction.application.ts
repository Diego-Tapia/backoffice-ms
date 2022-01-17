import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { ClientTypes } from 'src/features/client/client.types';
import { Client } from 'src/features/client/domain/entities/client.entity';
import { IClientRepository } from 'src/features/client/infrastructure/repositories/client-repository.interface';
import { Token } from 'src/features/token/domain/entities/token.entity';
import { Transaction } from 'src/features/transaction/domain/entities/transaction.entity';
import { ETransactionTypes } from 'src/features/transaction/domain/enums/transaction-types.enum';
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
import { IGetAllTransactionApplication } from './get-all-transaction-app.interface';

@Injectable()
export class GetAllTransactionApplication implements IGetAllTransactionApplication {
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

  public async execute(req: RequestModel): Promise<Transaction[]> {
    const { clientId } = req.admin;
    
    let transactionTypes = await this.transactionTypeRepository.findAll();

    transactionTypes = transactionTypes.filter(transaction => {
      return transaction.name === ETransactionTypes.INDIVIDUAL_INCREASE
        || transaction.name === ETransactionTypes.INDIVIDUAL_DECREASE
        || transaction.name === ETransactionTypes.MASSIVE_DECREMENT
        || transaction.name === ETransactionTypes.MASSIVE_INCREMENT
        || transaction.name === ETransactionTypes.RE_EMISION
        || transaction.name === ETransactionTypes.EMISION
    })

    let transactions = await this.transactionRepository.findAll(
      { 
        $or: [ 
          {transactionTypeId: new ObjectId(transactionTypes[0].id)}, 
          {transactionTypeId: new ObjectId(transactionTypes[1].id)},
          {transactionTypeId: new ObjectId(transactionTypes[2].id)}, 
          {transactionTypeId: new ObjectId(transactionTypes[3].id)}, 
          {transactionTypeId: new ObjectId(transactionTypes[4].id)}, 
          {transactionTypeId: new ObjectId(transactionTypes[5].id)}, 
        ] 
      },
      [ 
        { path: 'transactionTypeId' }, 
        { path: 'tokenId' },
      ]
    )
    
    transactions = transactions.filter(transaction => (transaction.token as Token).clientId === clientId);

    for (let transaction of transactions ) {
      transaction.destination = await this.findDestination(transaction.walletTo as string)
    }
    
    return transactions
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

