import { Applicabilities } from 'src/features/applicability/domain/entities/applicabilities.entity';
import { TransactionType } from 'src/features/transaction_type/domain/entities/transaction-type.entity';

export interface ITokenProps {
  shortName: string;
  symbol: string;
  price: number;
  money: string;
  status: string;
  bcItemId?: number;
  emited: boolean;
  operations?: TransactionType[] | string[];
  applicabilities?: Applicabilities[] | string[];
  clientId: string;
  description?: string;
  validFrom?: Date;
  validTo?: Date;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
