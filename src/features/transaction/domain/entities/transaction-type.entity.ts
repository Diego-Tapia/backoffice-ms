import { TransactionTypeModel } from '../../infrastructure/models/transaction-type.model';

export interface ITransactionTypeProps {
  name: string;
  description: string;
  id?: string;
}

export class TransactionType {
  name: string;
  description: string;
  id?: string;

  constructor({ name, description, id }: ITransactionTypeProps) {
    this.name = name;
    this.description = description;
    this.id = id;
  }

  static toEntity(model: TransactionTypeModel): TransactionType | string {
    const { name, description, _id } = model;

    const isModel = TransactionType.isModel(model);
    if (!isModel) return String(model);

    const transactionType = new TransactionType({ 
      name, 
      description, 
      id: _id.toString() 
    });

    return transactionType      
  }

  static isModel(model: TransactionTypeModel): boolean {
    return ( model?.name && model?.description && model?._id )
      ? true
      : false;
  }
}
