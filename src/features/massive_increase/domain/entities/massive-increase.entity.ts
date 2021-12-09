import { IMassiveIncrease } from "../interfaces/massive-increase-entity.interface";
import { EMassiveIncreaseStatus } from "../enums/massive-increase-status.enum";
import { MassiveIncreaseDetail } from './massive.increase-detail.entity'

export class MassiveIncrease {
  name: string;
  status: EMassiveIncreaseStatus;
  tokenId: string;
  adminId: string;
  clientId: string;
  id?: string;
  detail: MassiveIncreaseDetail[];
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
  }: IMassiveIncrease) {
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
}
