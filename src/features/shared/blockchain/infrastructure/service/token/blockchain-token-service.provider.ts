import { BlockchainTypes } from "../blockchain.types";
import { BlockchainTokenService } from "./blockchain-token.service";

export const BlockchainTokenServiceProvider = {
  provide: BlockchainTypes.INFRASTRUCTURE.TOKEN,
  useClass: BlockchainTokenService
}