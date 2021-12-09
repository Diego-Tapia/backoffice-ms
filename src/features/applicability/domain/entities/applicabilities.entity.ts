import { IApplicabilitiesProps } from '../interfaces/applicabilities-entity.interface';

export class Applicabilities {
  name: string;
  description: string;
  clientId: string;
  id?: string;

  constructor({ name, description, clientId, id }: IApplicabilitiesProps) {
    this.name = name;
    this.description = description;
    this.clientId = clientId;
    this.id = id;
  }
}
