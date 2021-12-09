import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery } from 'mongoose';
import { Model } from 'mongoose';
import { ApplicabilityModel } from '../models/applicability.model';
import { Applicabilities } from '../../domain/entities/applicabilities.entity';
import { IApplicabilityRepository } from './applicability-repository.interface';

@Injectable()
export class ApplicabilityRepository implements IApplicabilityRepository {
  constructor(
    @InjectModel(ApplicabilityModel.name)
    private readonly applicabilityModel: Model<ApplicabilityModel>,
  ) {}

  public async findAll(filter?: FilterQuery<ApplicabilityModel>): Promise<Applicabilities[]> {
    const applicabilityModel = await this.applicabilityModel.find(filter).exec();
    return applicabilityModel.map((applicability) => this.toDomainEntity(applicability));
  }

  private toDomainEntity(model: ApplicabilityModel): Applicabilities {
    const { name, description, clientId, id } = model;
    const applicabilityEntity = new Applicabilities({
      name: name,
      description: description,
      clientId: clientId.toString(),
      id: id,
    });
    return applicabilityEntity;
  }
}
