import { Inject, Controller, Get, Request } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IGetAllApplicabilitiesApp } from '../../features/applicability/application/get-all-applicabilities/get-all-applicabilities.app.interface';
import { ApplicabilityTypes } from '../../features/applicability/applicability.types';
import { AuthResponse } from 'src/features/admin/infrastructure/models/auth-response.model';

@ApiTags('applicabilities')
@Controller('applicabilities')
export class ApplicabilityController {
  constructor(
    @Inject(ApplicabilityTypes.APPLICATION.GET_ALL_APPLICABILITIES)
    private readonly getAllApplicabilitiesApp: IGetAllApplicabilitiesApp,
  ) {}

  @Get()
  @ApiResponse({
    status: 201,
    description: 'Retorna las aplicabilidades asignadas a un ID de Cliente',
    type: AuthResponse,
  })
  findAll(@Request() req) {
    return this.getAllApplicabilitiesApp.execute(req);
  }
}
