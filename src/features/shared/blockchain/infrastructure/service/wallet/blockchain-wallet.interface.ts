import { Wallet } from "src/features/wallet/domain/entities/wallet.entity";

export interface IBlockhainWalletServices {
    create(): Promise<Wallet>;
    findOne(wallet_id: string): Promise<Wallet>;
}