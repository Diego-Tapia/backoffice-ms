import { Inject, Controller, Get, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IGetAllApplicabilitiesApp } from '../../features/applicability/application/get-all-applicabilities/get-all-applicabilities.app.interface';
import { ApplicabilityTypes } from '../../features/applicability/applicability.types';

@ApiTags('applicability')
@Controller('applicability')
export class ApplicabilityController {
  constructor(
    @Inject(ApplicabilityTypes.APPLICATION.GET_ALL_APPLICABILITIES)
    private readonly getAllApplicabilitiesApp: IGetAllApplicabilitiesApp,
  ) {}

  @Get()
  findAll(@Request() req) {
    return this.getAllApplicabilitiesApp.execute(req);
  }
}
