import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AxiosInstance } from 'axios';
import configs from 'src/configs/environments/configs';
import { LibrariesTypes } from 'src/features/shared/libraries/libraries.types';
import { Transaction } from 'src/features/transaction/domain/entities/transaction.entity';
import { AxiosException } from '../errors/axios.exception';
import { IBlockchainTransactionService } from './blockchain-transaction-service.interface';

@Injectable()
export class BlockchainTransactionService implements IBlockchainTransactionService {
  private BLOCKCHAIN_URL: string;

  constructor(
    @Inject(configs.KEY) private readonly configService: ConfigType<typeof configs>,
    @Inject(LibrariesTypes.AXIOS) private readonly axios: AxiosInstance,
  ) {
    this.BLOCKCHAIN_URL = this.configService.blockchain_ms.url;
  }

  async create(transaction:Transaction): Promise<Transaction> {
    try {     
      const {data} = await this.axios.post(`${this.BLOCKCHAIN_URL}/transaction`, transaction)
      return data
    } catch (error) {
      throw new AxiosException(error)
    }
  }
}
