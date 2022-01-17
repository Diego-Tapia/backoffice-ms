import { WalletsByClientsTypes } from "../../walletsByclients.types";
import { GetAllWalletsByClientsApplication } from "./get-all-walletsByClients.application";


export const GetAllWalletsByClientsApplicationProvider = {
  provide: WalletsByClientsTypes.APPLICATION.GET_ALL_WALLETS_BY_CLIENTS,
  useClass: GetAllWalletsByClientsApplication,
};
