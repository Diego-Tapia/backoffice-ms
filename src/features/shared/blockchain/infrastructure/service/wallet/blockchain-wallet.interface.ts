import { Wallet } from "src/features/wallet/domain/entities/wallet.entity";

export interface IBlockhainWalletServices {
    create(): Promise<Wallet>;
    findById(walletId: string): Promise<Wallet>;
}