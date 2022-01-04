import { ClientModel } from "../../infrastructure/models/client.model";

export interface IClient {
  name: string;
  cuit: number;
  businessName: string;
  responsible: string;
  phoneNumber: number;
  email: string;
  status: string;
  industry: string;
  id?: string;
}

export class Client {
  name: string;
  cuit: number;
  businessName: string;
  responsible: string;
  phoneNumber: number;
  email: string;
  status: string;
  industry: string;
  id?: string;

  constructor({
    name,
    cuit,
    businessName,
    responsible,
    phoneNumber,
    email,
    status,
    industry,
    id,
  }: IClient) {
    this.name = name;
    this.cuit = cuit;
    this.businessName = businessName;
    this.responsible = responsible;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.status = status;
    this.industry = industry;
    this.id = id;
  }

  static toEntity(model: ClientModel) {
    const { name, cuit, businessName, responsible, phoneNumber, email, status, industry, _id} = model;

    const isString = typeof model === 'string';
    if (isString) return model; 

    const clientEntity = new Client({
      name,
      cuit,
      businessName,
      responsible,
      phoneNumber,
      email,
      status,
      industry,
      id: _id.toString()
    });
    return clientEntity;
  }
}
