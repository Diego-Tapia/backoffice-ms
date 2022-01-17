import { MassiveDecreaseModel } from "../../infrastructure/models/massive-decrease.model";
import { MassiveIncreaseModel } from "../../infrastructure/models/massive-increase.model";
import { EMassiveStatus } from "../enums/massive-status.enum";
import { MassiveDetail } from "./massive-detail.entity";

export interface IMassiveProps {
  name: string;
  status: EMassiveStatus;
  tokenId: string;
  adminId: string;
  clientId: string;
  detail: MassiveDetail[];
  id?: string;
  recordLengthTotal?: number;
  recordLengthValidatedOk?: number;
  recordLengthValidatedError?: number;
  totalAmountValidated?: number;
  totalAmountExecuted?: number  
  recordLengthExecutedOk?: number;
  recordLengthExecutedError?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Massive {
  name: string;
  status: EMassiveStatus;
  tokenId: string;
  adminId: string;
  clientId: string;
  id?: string;
  detail: MassiveDetail[];
  recordLengthTotal?: number;
  recordLengthValidatedOk?: number;
  recordLengthValidatedError?: number;
  totalAmountValidated?: number;
  totalAmountExecuted?: number  
  recordLengthExecutedOk?: number;
  recordLengthExecutedError?: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    name,
    status,
    tokenId,
    adminId,
    clientId,
    detail,
    id,
    recordLengthTotal,
    recordLengthValidatedOk,
    recordLengthValidatedError,
    totalAmountValidated,
    totalAmountExecuted, 
    recordLengthExecutedOk,
    recordLengthExecutedError,
    createdAt,
    updatedAt
  }: IMassiveProps) {
    this.name = name;
    this.status = status;
    this.tokenId = tokenId;
    this.adminId = adminId;
    this.clientId = clientId;
    this.detail = detail;
    this.id = id;
    this.recordLengthTotal = recordLengthTotal;
    this.recordLengthValidatedOk = recordLengthValidatedOk;
    this.recordLengthValidatedError = recordLengthValidatedError;
    this.totalAmountValidated = totalAmountValidated;
    this.totalAmountExecuted = totalAmountExecuted;
    this.recordLengthExecutedOk = recordLengthExecutedOk;
    this.recordLengthExecutedError = recordLengthExecutedError;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static toEntity(model: MassiveIncreaseModel | MassiveDecreaseModel): Massive {
    const {
      name,
      status,
      tokenId,
      adminId,
      clientId,
      detail,
      _id,
      recordLengthTotal,
      recordLengthValidatedOk,
      recordLengthValidatedError,
      totalAmountValidated,
      totalAmountExecuted,
      recordLengthExecutedOk,
      recordLengthExecutedError,
      createdAt,
      updatedAt,
    } = model;

    const massiveIncreaseEntity = new Massive({
      name,
      status,
      tokenId: tokenId.toString(),
      adminId: adminId.toString(),
      clientId: clientId.toString(),
      detail,
      id: _id.toString(),
      recordLengthTotal,
      recordLengthValidatedOk,
      recordLengthValidatedError,
      totalAmountValidated,
      totalAmountExecuted,
      recordLengthExecutedOk,
      recordLengthExecutedError,
      createdAt,
      updatedAt,
    });
    return massiveIncreaseEntity;
  }

}
