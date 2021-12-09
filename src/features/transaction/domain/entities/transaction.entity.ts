interface ITransaction {
  hash: string;
  amount: number;
  notes: string;
  token: string;
  userId: string;
  transactionType: string; 
  walletFrom: string;
  walletTo: string;
}

export class Transaction {
  hash: string;
  amount: number;
  notes: string;
  token: string;
  userId: string;
  transactionType: string; 
  walletFrom: string;
  walletTo: string;

  constructor({ 
    hash,
    amount,
    notes,
    token,
    userId,
    transactionType,
    walletFrom,
    walletTo}: ITransaction
  ) {
    this.hash = hash;
    this.amount = amount; 
    this.notes = notes;
    this.token = token;
    this.userId = userId;
    this.transactionType = transactionType; 
    this.walletFrom = walletFrom;
    this.walletTo = walletTo;
  }
}