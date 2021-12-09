export const ApplicabilityTypes = {
  APPLICATION: {
    CREATE_APPLICABILITY: Symbol(''),
    GET_ALL_APPLICABILITIES: Symbol('GetAllApplicabilitiesApp'),
    GET_APPLICABILITY_BY_ID: Symbol(''),
  },
  INFRASTRUCTURE: {
    REPOSITORY: Symbol('ApplicabilityRepository'),
  },
};
