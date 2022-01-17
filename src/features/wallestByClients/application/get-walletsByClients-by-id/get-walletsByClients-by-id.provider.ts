import { WalletsByClientsTypes } from "../../walletsByclients.types";
import { GetWalletsByClientsByIdApplication } from "./get-walletsByClients-by-id.application";

export const GetWalletsByClientsByIdApplicationProvider = {
    provide: WalletsByClientsTypes.APPLICATION.GET_WALLETSBYCLIENTS_BY_ID,
    useClass: GetWalletsByClientsByIdApplication,
  };
  