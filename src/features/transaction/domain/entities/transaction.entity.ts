interface ITransaction {
  transactionType: string;
  token: string;
  walletFrom: string;
  walletTo: string;
  amount: number;
  user: string;
  notes?: string;
  id?: string;
  hash?: string;
}

export class Transaction {
  transactionType: string;
  token: string;
  walletFrom: string;
  walletTo: string;
  amount: number;
  user: string;
  notes?: string;
  hash?: string;
  id?: string;

  constructor({
    transactionType,
    token,
    walletFrom,
    walletTo,
    amount,
    user,
    notes,
    hash,
    id,
  }: ITransaction) {
    this.transactionType = transactionType;
    this.token = token;
    this.walletFrom = walletFrom;
    this.walletTo = walletTo;
    this.amount = amount;
    this.user = user;
    this.notes = notes;
    this.hash = hash;
    this.id = id;
  }
}
