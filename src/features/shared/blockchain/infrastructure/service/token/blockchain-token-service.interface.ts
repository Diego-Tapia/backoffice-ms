import { Token } from "src/features/token/domain/entities/token.entity";

export interface IBlockchainTokenService {
    emitToken(tokenId: string, idAdmin: string): Promise<Token>
    reemitToken(tokenId: string, idAdmin: string, amount: number): Promise<Token>
}