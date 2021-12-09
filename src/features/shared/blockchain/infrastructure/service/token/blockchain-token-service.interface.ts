import { Token } from "src/features/token/domain/entities/token.entity";

export interface IBlockchainTokenService {
    emitToken(item_id: number, amount: number): Promise<Token>
}