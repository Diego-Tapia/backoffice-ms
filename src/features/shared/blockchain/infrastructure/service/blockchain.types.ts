export const BlockchainTypes = {
  INFRASTRUCTURE: {
    TOKEN: Symbol('BlockchainTokenService'),
    TRANSACTION: Symbol('BlockchainTransactionService'),
    WALLET: Symbol('BlockchainWalletService')
  },
  LIBRARY: {
    AXIOS: Symbol('AxiosLibrary')
  }
};
  