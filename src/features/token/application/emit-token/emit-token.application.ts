import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BlockchainTypes } from 'src/features/shared/blockchain/infrastructure/service/blockchain.types';
import { IBlockchainTokenService } from 'src/features/shared/blockchain/infrastructure/service/token/blockchain-token-service.interface';
import { ETokenStatus } from 'src/features/token/domain/enums/token-status.enum';
import { Token } from '../../domain/entities/token.entity';
import { ITokenRepository } from '../../infrastructure/repositories/token-repository.interface';
import { TokenTypes } from '../../token.types';
import { IEmitTokenApplication } from './emit-token-app.interface';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { IWalletsByClientsRepository } from 'src/features/wallestByClients/infrastructure/repositories/walletsByClients-repository.interface';
import { WalletsByClientsTypes } from 'src/features/wallestByClients/walletsByclients.types';
import { Wallet } from 'src/features/wallet/domain/entities/wallet.entity';
import { IWalletRepository } from 'src/features/wallet/infrastructure/repositories/wallet-repository.interface';
import { WalletTypes } from 'src/features/wallet/wallet.type';

@Injectable()
export class EmitTokenApplication implements IEmitTokenApplication {
  private mainWallet: Wallet;

  constructor(
    @Inject(TokenTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly tokenRepository: ITokenRepository,
    @Inject(WalletTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletRepository: IWalletRepository,
    @Inject(WalletsByClientsTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletByClientRepository: IWalletsByClientsRepository,
    @Inject(BlockchainTypes.INFRASTRUCTURE.TOKEN)
    private readonly blockchainTokenService: IBlockchainTokenService,
  ) {}

  public async execute(id: string, request: RequestModel): Promise<void> {
    
    const { clientId } = request.admin;

    const token: Token = await this.tokenRepository.findById(id);

    if (!token) throw new HttpException('No existe un activo digital con ese id', HttpStatus.NOT_FOUND);
    if (token.emited) throw new HttpException('Este activo digital ya fue emitido por primera vez', HttpStatus.FORBIDDEN);
    if (token.status === ETokenStatus.INACTIVE) throw new HttpException('El estado del activo digital es INACTIVO', HttpStatus.FORBIDDEN);

    const clientWallet = await this.walletByClientRepository.findOne({ clientId: clientId })
    if (!clientWallet) throw new NotFoundException("Wallet id de cliente no encontrada.");
    this.mainWallet = await this.walletRepository.findById(clientWallet.walletId as string);
    if (!this.mainWallet) throw new NotFoundException("Wallet de cliente no encontrada.");

    await this.blockchainTokenService.emitToken(token.id, request.admin.id, token.initialAmount)
    
    try {
      await this.tokenRepository.update({_id: id}, { emited: true });
    } catch (error) {
      throw new HttpException('Error actualizando el estado del token', HttpStatus.INTERNAL_SERVER_ERROR)      
    }
  }
}
