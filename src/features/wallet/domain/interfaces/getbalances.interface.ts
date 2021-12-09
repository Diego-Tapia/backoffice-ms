import { IBalances } from "./balances.interface";

export interface IGetBalances {
    total: number;
    balances: IBalances[];
}