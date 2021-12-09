import { MassiveIncreaseDetail } from "../entities/massive.increase-detail.entity";
import { EMassiveIncreaseStatus } from "../enums/massive-increase-status.enum";

export interface IMassiveIncrease {
  name: string;
  status: EMassiveIncreaseStatus;
  tokenId: string;
  adminId: string;
  clientId: string;
  detail: MassiveIncreaseDetail[];
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
