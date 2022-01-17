export const TransactionTypes = {
  APPLICATION: {
    // MASSIVE_DECREASE
    CREATE_MASSIVE_DECREASE: Symbol('CreateMassiveDecreaseApplication'),
    VALIDATE_MASSIVE_DECREASE: Symbol('ValidateMassiveDecreaseApplication'),
    PROCESS_MASSIVE_DECREASE: Symbol('ProcessMassiveDecreaseApplication'),
    CANCEL_MASSIVE_DECREASE: Symbol('CancelMassiveDecreaseApplication'),
    GET_ALL_MASSIVE_DECREASE: Symbol('GetAllMassiveDecreaseApplication'),
    GET_MASSIVE_DECREASE_BY_ID: Symbol('GetMassiveDecreaseByIdApplication'),
    // MASSIVE_INCREASE
    CREATE_MASSIVE_INCREASE: Symbol('CreateMassiveIncreaseApplication'),
    VALIDATE_MASSIVE_INCREASE: Symbol('ValidateMassiveIncreaseApplication'),
    PROCESS_MASSIVE_INCREASE: Symbol('ProcessMassiveIncreaseApplication'),
    CANCEL_MASSIVE_INCREASE: Symbol('CancelMassiveIncreaseApplication'),
    GET_ALL_MASSIVE_INCREASE: Symbol('GetAllMassiveIncreaseApplication'),
    GET_MASSIVE_INCREASE_BY_ID: Symbol('GetMassiveIncreaseByIdApplication'),
    // INIDVIDUAL
    INDIVIDUAL_INCREASE: Symbol('IndividualIncreaseApplication'),
    INDIVIDUAL_DECREASE: Symbol('IndividualDecreaseApplication'),
    // TRANSACTION
    GET_ALL_TRANSACTIONS: Symbol('GetAllTransactionsApplication'),
    GET_TRANSACTIONS_BY_ID: Symbol('GetTransactionByIdApplication'),
    TRANSACTION_EMMITER: Symbol('TransactionEmmiterApplication'),
    // TRANSACTION_TYPES
    CREATE_TRANSACTIONTYPES: Symbol('CreateTransactionTypesApplication')
  },
  INFRASTRUCTURE: {
    MASSIVE_INCREASE_REPOSITORY: Symbol('MassiveIncreaseRepository'),
    MASSIVE_DECREASE_REPOSITORY: Symbol('MassiveDecreaseRepository'),
    TRANSACTION_REPOSITORY: Symbol('TransactionRepository'),
    TRANSACTION_TYPE_REPOSITORY: Symbol('TransactionTypeRepository'),
  },
};
