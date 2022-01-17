import { Inject } from '@nestjs/common';
import { WalletsByClients } from '../../domain/walletsByclients.entity';
import { IWalletsByClientsRepository } from '../../infrastructure/repositories/walletsByClients-repository.interface';
import { WalletsByClientsTypes } from '../../walletsByclients.types';
import { IGetAllWalletsByClientsApplication } from './get-all-walletsByclients.app.interface';

export class GetAllWalletsByClientsApplication implements IGetAllWalletsByClientsApplication {
  constructor(
    @Inject(WalletsByClientsTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletsByClientsRepository: IWalletsByClientsRepository,
  ) { }

  public async execute(): Promise<WalletsByClients[]> {
    return await this.walletsByClientsRepository.findAll(null, [
      { path: 'clientId' },
      { path: 'walletId' },
    ]);
  }
}
