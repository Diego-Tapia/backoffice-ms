import { ApplicabilityTypes } from '../../applicability.types';
import { GetAllApplicabilitiesApp } from './get-all-applicabilities.application';

export const GetAllApplicabilitiesProvider = {
  provide: ApplicabilityTypes.APPLICATION.GET_ALL_APPLICABILITIES,
  useClass: GetAllApplicabilitiesApp,
};
