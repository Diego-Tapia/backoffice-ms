import { ITransactionTypeProps } from '../interfaces/transactionType-entity.interface';

export class TransactionType {
  name: string;
  description: string;
  id?: string;

  constructor({ name, description, id }: ITransactionTypeProps) {
    this.name = name;
    this.description = description;
    this.id = id;
  }
}
