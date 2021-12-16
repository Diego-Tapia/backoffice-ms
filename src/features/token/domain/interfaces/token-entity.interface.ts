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
  initialAmount: number;
  transferable: boolean;
  description?: string;
  validFrom?: Date;
  validTo?: Date;
  observation?: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
