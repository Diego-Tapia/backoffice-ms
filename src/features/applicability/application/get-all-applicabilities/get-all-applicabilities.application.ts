import { Injectable, Inject } from '@nestjs/common';
import { Applicabilities } from '../../domain/entities/applicabilities.entity';
import { IApplicabilityRepository } from '../../infrastructure/repositories/applicability-repository.interface';
import { IGetAllApplicabilitiesApp } from './get-all-applicabilities.app.interface';
import { ApplicabilityTypes } from '../../applicability.types';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';

@Injectable()
export class GetAllApplicabilitiesApp implements IGetAllApplicabilitiesApp {
  constructor(
    @Inject(ApplicabilityTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly applicabilityRepository: IApplicabilityRepository,
  ) {}

  public execute(req: RequestModel): Promise<Applicabilities[]> {
    const { clientId } = req.admin;
    return this.applicabilityRepository.findAll({ clientId });
  }
}
