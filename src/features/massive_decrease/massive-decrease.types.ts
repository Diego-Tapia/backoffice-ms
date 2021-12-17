export const MassiveDecreaseTypes = {
  APPLICATION: {
    CREATE_MASSIVE_DECREASE: Symbol('CreateMassiveDecreaseApplication'),
    VALIDATE_MASSIVE_DECREASE: Symbol('ValidateMassiveDecreaseApplication'),
    PROCESS_MASSIVE_DECREASE: Symbol('ProcessMassiveDecreaseApplication'),
    CANCEL_MASSIVE_DECREASE: Symbol('CancelMassiveDecreaseApplication'),
    GET_ALL_MASSIVE_DECREASE: Symbol('GetAllMassiveDecreaseApplication'),
    GET_BY_ID_MASSIVE_DECREASE: Symbol('GetByIdMassiveDecreaseApplication'),
  },
  INFRASTRUCTURE: {
    REPOSITORY: Symbol('MassiveDecreaseRepository'),
  },
};
