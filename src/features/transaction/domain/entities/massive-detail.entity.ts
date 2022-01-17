import { EMassiveDetailStatus } from "../enums/massive-detail-status.enum";

export interface IMassiveDetailProps {
  id: number;
  userId: string | number;
  amount: number;
  note?: string;
  status?: EMassiveDetailStatus;
  error?: string[];
}

export class MassiveDetail {
  id: number;
  userId: string | number;
  amount: number;
  note?: string;
  status?: EMassiveDetailStatus;
  error?: string[];
  
  constructor({
    id,
    userId,
    amount,
    note,
    status,
    error }: IMassiveDetailProps,
  ) {
    this.id = id;
    this.userId = userId;
    this.amount = amount;
    this.note = note;
    this.status = status;
    this.error = error;
  }
}