import { WalletsByClientsTypes } from "../../walletsByClients.types";
import { GetWalletsByClientsByIdApplication } from "./get-by-id-walletsByClients.application";

export const GetWalletsByClientsByIdApplicationProvider = {
    provide: WalletsByClientsTypes.APPLICATION.GET_WALLETSBYCLIENTS_BY_ID,
    useClass: GetWalletsByClientsByIdApplication,
  };
  