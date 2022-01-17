export const WalletTypes = {
  APPLICATION: {
    CREATE_WALLET: Symbol('CreateWalletApplication'),
    GET_BALANCES: Symbol('GetBalancesApplication'),
    GET_ALL_BALANCES: Symbol('GetAllBalancesApplication'),
  },
  INFRASTRUCTURE: {
    REPOSITORY: Symbol('WalletRepository'),
  },
};
