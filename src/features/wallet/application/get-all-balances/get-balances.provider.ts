import { WalletTypes } from "../../wallet.type";
import { GetBalancesApplication } from "./get-balances.application";

export const GetBalancesApplicationProvider = {
    provide: WalletTypes.APPLICATION.GET_BALANCES,
    useClass: GetBalancesApplication,
};