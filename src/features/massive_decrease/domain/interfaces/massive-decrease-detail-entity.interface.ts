import { EMassiveDecreaseDetailStatus } from "../enums/massive.decrease-detail-status.enum";

export interface IMassiveDecreaseDetail {
  id: number;
  userId: string | number;
  amount: number;
  note?: string;
  status?: EMassiveDecreaseDetailStatus;
  error?: string[];
}
