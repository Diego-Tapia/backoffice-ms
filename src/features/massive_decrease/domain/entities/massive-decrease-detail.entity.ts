import { IMassiveDecreaseDetail } from "../interfaces/massive-decrease-detail-entity.interface";
import { EMassiveDecreaseDetailStatus } from "../enums/massive.decrease-detail-status.enum";

export class MassiveDecreaseDetail {
  id: number;
  userId: string | number;
  amount: number;
  note?: string;
  status?: EMassiveDecreaseDetailStatus;
  error?: string[];
  
  constructor({
    id,
    userId,
    amount,
    note,
    status,
    error }: IMassiveDecreaseDetail,
  ) {
    this.id = id;
    this.userId = userId;
    this.amount = amount;
    this.note = note;
    this.status = status;
    this.error = error;
  }
}