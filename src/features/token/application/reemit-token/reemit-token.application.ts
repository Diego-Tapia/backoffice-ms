import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { BlockchainTypes } from 'src/features/shared/blockchain/infrastructure/service/blockchain.types';
import { IBlockchainTokenService } from 'src/features/shared/blockchain/infrastructure/service/token/blockchain-token-service.interface';
import { IBlockchainTransactionService } from 'src/features/shared/blockchain/infrastructure/service/transaction/blockchain-transaction-service.interface';
import { TokenStatus } from 'src/features/shared/interfaces/token-status.interface';
import { ETransactionTypes } from 'src/features/transaction_type/domain/enums/transaction-types.enum';
import { Transaction } from 'src/features/transaction/domain/entities/transaction.entity';

import { Token } from '../../domain/entities/token.entity';
import { ReemitTokenDto } from '../../infrastructure/dtos/reemit-token.dto';
import { ITokenRepository } from '../../infrastructure/repositories/token-repository.interface';
import { TokenTypes } from '../../token.types';
import { IReemitTokenApplication } from './reemit-token-app.interface';

@Injectable()
export class ReemitTokenApplication implements IReemitTokenApplication {
  constructor(
    @Inject(TokenTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly tokenRepository: ITokenRepository,
    @Inject(BlockchainTypes.INFRASTRUCTURE.TRANSACTION)
    private readonly blockchainTransactionService: IBlockchainTransactionService,
    @Inject(BlockchainTypes.INFRASTRUCTURE.TOKEN)
    private readonly blockchainTokenService: IBlockchainTokenService,
  ) {}

  public async execute(id: string, reemitTokenDto: ReemitTokenDto): Promise<Transaction> {

    const token: Token = await this.tokenRepository.findById(id);

    if (!token) throw new HttpException('No existe un activo digital con ese id', HttpStatus.NOT_FOUND);
    if (!token.emited) throw new HttpException('Este activo digital NO fue emitido por primera vez', HttpStatus.FORBIDDEN);
    if (token.status === TokenStatus.INACTIVE) throw new HttpException('El estado del activo digital es INACTIVO', HttpStatus.FORBIDDEN);

    await this.blockchainTokenService.emitToken(+token.bcItemId, token.price)

    const transaction = new Transaction({
      hash: 'HASH',
      amount: reemitTokenDto.amount,
      notes: `Reemisión: ${token.shortName}`,
      token: token.id,
      userId: null,
      transactionType: ETransactionTypes.RE_EMISION,
      walletFrom: 'BLOCKCHAIN',
      walletTo: 'BILLETERA-MADRE' 
    });

    return this.blockchainTransactionService.create(transaction);
  }
}
