import { IncrementTypes } from '../../increment.types';
import { IncrementRepository } from './increment-repository';

export const IncrementRepositoryProvider = {
  provide: IncrementTypes.INFRASTRUCTURE.REPOSITORY,
  useClass: IncrementRepository,
};
