import { BlockchainTypes } from "../blockchain.types";
import { BlockchainTransactionService } from "./blockchain-transaction.service";

export const BlockchainTransactionServiceProvider = {
    provide: BlockchainTypes.INFRASTRUCTURE.TRANSACTION,
    useClass: BlockchainTransactionService
}