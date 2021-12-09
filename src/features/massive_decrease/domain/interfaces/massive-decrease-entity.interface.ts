import { MassiveDecreaseDetail } from "../entities/massive-decrease-detail.entity";
import { EMassiveDecreaseStatus } from "../enums/massive-decrease-status.enum";

export interface IMassiveDecrease {
  name: string;
  status: EMassiveDecreaseStatus;
  tokenId: string;
  adminId: string;
  clientId: string;
  detail: MassiveDecreaseDetail[];
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
