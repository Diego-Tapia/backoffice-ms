import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Role } from '../../domain/entities/role.entity';
import { RoleModel } from '../models/role.model';
import { IRoleRepository } from './role-repository.interface';

export class RoleRepository implements IRoleRepository {
  constructor(
    @InjectModel(RoleModel.name)
    private readonly roleModel: Model<RoleModel>,
  ) {}

  async create(role: Role): Promise<Role> {
    const saveRole = new this.roleModel(role);
    let model = await saveRole.save();
    return this.toEntity(model);
  }

  async findAll(filter?: FilterQuery<RoleModel>): Promise<Role[]> {
    const models = await this.roleModel.find(filter).exec();
    return models.map((model) => this.toEntity(model));
  }

  toEntity(model: RoleModel) {
    const { name, description, _id } = model;
    const roleEntity = new Role({name, description, id: _id.toString() })
    return roleEntity
  }
}
