import { IGetBalances } from "../../domain/interfaces/getbalances.interface";

export interface IGetBalancesApplication {
    execute(walletId: string): Promise<IGetBalances>;
}