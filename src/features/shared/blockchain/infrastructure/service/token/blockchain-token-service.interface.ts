import { Token } from "src/features/token/domain/entities/token.entity";

export interface IBlockchainTokenService {
    emitToken(tokenId: string, idAdmin: string): Promise<Token>
}