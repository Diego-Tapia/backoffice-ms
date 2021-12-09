import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ApplicabilityModel,
  ApplicabilitySchema,
} from './infrastructure/models/applicability.model';
import { GetAllApplicabilitiesProvider } from './application/get-all-applicabilities/get-all-applicabilities.provider';
import { ApplicabilityController } from '../../api/applicability/applicability.controller';
import { ApplicabilityRepositoryProvider } from './infrastructure/repositories/applicability-repository.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ApplicabilityModel.name, schema: ApplicabilitySchema }]),
  ],
  providers: [ApplicabilityRepositoryProvider, GetAllApplicabilitiesProvider],
  controllers: [ApplicabilityController],
})
export class ApplicabilityModule {}
