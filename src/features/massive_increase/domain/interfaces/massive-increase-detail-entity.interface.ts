import { EMassiveIncreaseDetailStatus } from "../enums/massive.increase-detail-status.enum";

export interface IMassiveIncreaseDetail {
  id: number;
  userId: string | number;
  amount: number;
  note?: string;
  status?: EMassiveIncreaseDetailStatus;
  error?: string[];
}
