import { ApplicabilityTypes } from '../../applicability.types';
import { ApplicabilityRepository } from './applicability.repository';

export const ApplicabilityRepositoryProvider = {
  provide: ApplicabilityTypes.INFRASTRUCTURE.REPOSITORY,
  useClass: ApplicabilityRepository,
};
