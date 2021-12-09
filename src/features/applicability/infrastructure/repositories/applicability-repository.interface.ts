import { FilterQuery } from 'mongoose';
import { Applicabilities } from '../../domain/entities/applicabilities.entity';
import { ApplicabilityModel } from '../models/applicability.model';

export interface IApplicabilityRepository {
  findAll(filter?: FilterQuery<ApplicabilityModel>): Promise<Applicabilities[]>;
}
