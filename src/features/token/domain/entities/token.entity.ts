import { Applicabilities } from "src/features/applicability/domain/entities/applicabilities.entity";
import { TransactionType } from "src/features/transaction_type/domain/entities/transaction-type.entity";
import { ITokenProps } from "../interfaces/token-entity.interface";

export class Token {
  shortName: string;
  symbol: string;
  price: number;
  status: string;
  money: string;
  bcItemId: number;
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

  constructor({
    id, 
    shortName,
    symbol,
    price,
    money,
    status,
    bcItemId,
    emited,
    operations,
    applicabilities,
    clientId,
    description,
    validFrom,
    validTo,
    createdAt,
    updatedAt}: ITokenProps
  ) {
    this.shortName = shortName;
    this.symbol = symbol;
    this.price = price;
    this.money = money;
    this.status = status;
    this.bcItemId = bcItemId;
    this.emited = emited;
    this.applicabilities = applicabilities;
    this.operations = operations;
    this.clientId = clientId
    this.description = description;
    this.validFrom = validFrom;
    this.validTo = validTo;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}