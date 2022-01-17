import { Inject } from '@nestjs/common';
import { WalletsByClients } from '../../domain/walletsByclients.entity';
import { IWalletsByClientsRepository } from '../../infrastructure/repositories/walletsByClients-repository.interface';
import { WalletsByClientsTypes } from '../../walletsByclients.types';
import { IGetWalletsByClientsByIdApplication } from './get-walletsByClients-by-id.app.interface';

export class GetWalletsByClientsByIdApplication implements IGetWalletsByClientsByIdApplication {
  constructor(
    @Inject(WalletsByClientsTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletsByClientsRepository: IWalletsByClientsRepository,
  ) { }

  public async execute(id: string): Promise<WalletsByClients> {
    return await this.walletsByClientsRepository.findById(id, [
      { path: 'clientId' },
      { path: 'walletId' },
    ]);
  }
}
