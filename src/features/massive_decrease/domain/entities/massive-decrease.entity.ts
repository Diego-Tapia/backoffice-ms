import { IMassiveDecrease } from "../interfaces/massive-decrease-entity.interface";
import { EMassiveDecreaseStatus } from "../enums/massive-decrease-status.enum";
import { MassiveDecreaseDetail } from "./massive-decrease-detail.entity";

export class MassiveDecrease {
  name: string;
  status: EMassiveDecreaseStatus;
  tokenId: string;
  adminId: string;
  clientId: string;
  id?: string;
  detail: MassiveDecreaseDetail[];
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
  }: IMassiveDecrease) {
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
