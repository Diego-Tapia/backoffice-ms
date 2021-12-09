export const WalletTypes = {
  APPLICATION: {
    CREATE_WALLET: Symbol('CreateWalletApplication'),
    GET_BALANCES: Symbol('GetBalancesApplication'),
  },
  INFRASTRUCTURE: {
    REPOSITORY: Symbol('WalletRepository'),
  },
};
