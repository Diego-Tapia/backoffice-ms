import { Client } from "src/features/client/domain/entities/client.entity";
import { ClientModel } from "src/features/client/infrastructure/models/client.model";
import { ApplicabilityModel } from "../../infrastructure/models/applicability.model";

export interface IApplicabilitiesProps {
  name: string;
  description: string;
  clientId: string | Client;
  id?: string;
}

export class Applicabilities {
  name: string;
  description: string;
  clientId: string | Client;
  id?: string;

  constructor({ name, description, clientId, id }: IApplicabilitiesProps) {
    this.name = name;
    this.description = description;
    this.clientId = clientId;
    this.id = id;
  }

  static toEntity(model: ApplicabilityModel): Applicabilities | string {
    const { name, description, clientId, _id } = model
    
    const isModel = Applicabilities.isModel(model);
    if (!isModel) return String(model);

    const applicabilitiesEntity = new Applicabilities({
      name,
      clientId: Client.toEntity(clientId as ClientModel),
      description,
      id: _id
    })

    return applicabilitiesEntity;
  }

  static isModel(model: ApplicabilityModel): boolean {
    return ( model?.name && model?.clientId && model?.description && model?._id )
      ? true
      : false;
  }

}
