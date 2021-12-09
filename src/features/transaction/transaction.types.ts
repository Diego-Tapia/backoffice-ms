export const TransactionTypes = {
  APPLICATION: {
    CREATE_TRANSACTION: Symbol('CreateTransactionApplication'),
    GET_ALL_TRANSACTIONS: Symbol('GetAllTransactionsApplication'),
    GET_TRANSACTIONS_BY_ID: Symbol('GetTransactionByIdApplication'),
  },
  INFRASTRUCTURE: {
    REPOSITORY: Symbol('TransactionRepository'),
  },
};
