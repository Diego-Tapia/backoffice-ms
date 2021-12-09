export const IncrementTypes = {
  APPLICATION: {
    INDIVIDUAL_INCREMENT: Symbol('IndividualIncrementApplication'),
    GET_ALL_INDIVIDUAL_INCREMENT: Symbol('GetAllIndividualIncrementApplication')
  },
  INFRASTRUCTURE: {
    REPOSITORY: Symbol('IncrementRepository'),
  },
};
