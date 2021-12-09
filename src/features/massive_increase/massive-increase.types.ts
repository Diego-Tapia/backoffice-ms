export const MassiveIncreaseTypes = {
  APPLICATION: {
    CREATE_MASSIVE_INCREASE: Symbol('CreateMassiveIncreaseApplication'),
    VALIDATE_MASSIVE_INCREASE: Symbol('ValidateMassiveIncreaseApplication'),
    PROCESS_MASSIVE_INCREASE: Symbol('ProcessMassiveIncreaseApplication'),
    CANCEL_MASSIVE_INCREASE: Symbol('CancelMassiveIncreaseApplication'),
  },
  INFRASTRUCTURE: {
    REPOSITORY: Symbol('MassiveIncreaseRepository'),
  },
};
