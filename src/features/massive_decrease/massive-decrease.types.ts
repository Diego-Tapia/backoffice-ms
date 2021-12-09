export const MassiveDecreaseTypes = {
  APPLICATION: {
    CREATE_MASSIVE_DECREASE: Symbol('CreateMassiveDecreaseApplication'),
    VALIDATE_MASSIVE_DECREASE: Symbol('ValidateMassiveDecreaseApplication'),
    PROCESS_MASSIVE_DECREASE: Symbol('ProcessMassiveDecreaseApplication'),
    CANCEL_MASSIVE_DECREASE: Symbol('CancelMassiveDecreaseApplication'),
  },
  INFRASTRUCTURE: {
    REPOSITORY: Symbol('MassiveDecreaseRepository'),
  },
};
