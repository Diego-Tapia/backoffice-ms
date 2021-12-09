export const WalletsByClientsTypes = {
    APPLICATION: {
      GET_ALL_WALLETS_BY_CLIENTS: Symbol('GetAllWalletsByClientsApplication'),
      GET_WALLETSBYCLIENTS_BY_ID: Symbol('GetWalletsByClientsByIdApplication'),
    },
    INFRASTRUCTURE: {
      REPOSITORY: Symbol('WalletsByClientsRepository'),
    },
  };
  