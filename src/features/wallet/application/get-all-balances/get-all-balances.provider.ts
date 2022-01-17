import { WalletTypes } from "../../wallet.type";
import { GetAllBalancesApplication } from "./get-all-balances.application";

export const GetAllBalancesApplicationProvider = {
    provide: WalletTypes.APPLICATION.GET_ALL_BALANCES,
    useClass: GetAllBalancesApplication,
};