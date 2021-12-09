import { IMassiveIncreaseDetail } from '../interfaces/massive-increase-detail-entity.interface';
import { EMassiveIncreaseDetailStatus } from '../enums/massive.increase-detail-status.enum'

export class MassiveIncreaseDetail {
  id: number;
  userId: string | number;
  amount: number;
  note?: string;
  status?: EMassiveIncreaseDetailStatus;
  error?: string[];
  
  constructor({
    id,
    userId,
    amount,
    note,
    status,
    error }: IMassiveIncreaseDetail,
  ) {
    this.id = id;
    this.userId = userId;
    this.amount = amount;
    this.note = note;
    this.status = status;
    this.error = error;
  }
}