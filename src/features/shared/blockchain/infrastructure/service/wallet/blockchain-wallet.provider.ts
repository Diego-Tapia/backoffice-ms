import { BlockchainTypes } from "../blockchain.types";
import { BlockchainWalletService } from "./blockchain-wallet.service";

export const BlockchainWalletServiceProvider = {
  provide: BlockchainTypes.INFRASTRUCTURE.WALLET,
  useClass: BlockchainWalletService
};
