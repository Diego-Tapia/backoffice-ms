export const MassiveIncreaseTypes = {
  APPLICATION: {
    CREATE_MASSIVE_INCREASE: Symbol('CreateMassiveIncreaseApplication'),
    VALIDATE_MASSIVE_INCREASE: Symbol('ValidateMassiveIncreaseApplication'),
    PROCESS_MASSIVE_INCREASE: Symbol('ProcessMassiveIncreaseApplication'),
    CANCEL_MASSIVE_INCREASE: Symbol('CancelMassiveIncreaseApplication'),
    GET_ALL_MASSIVE_INCREASE: Symbol('GetAllMassiveIncreaseApplication'),
    GET_BY_ID_MASSIVE_INCREASE: Symbol('GetByIdMassiveIncreaseApplication'),
  },
  INFRASTRUCTURE: {
    REPOSITORY: Symbol('MassiveIncreaseRepository'),
  },
};
