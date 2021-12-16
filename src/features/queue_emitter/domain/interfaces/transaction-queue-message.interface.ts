export interface ITransactionQueueMessage {
  transactionType: string;
  tokenId: string;
  amount: number;
  userId: string;
  notes?: string;
  walletFrom: string;
  walletTo: string;
  massiveDecreaseId?: string;
  massiveIncreaseId?: string;
  detailId?: number;
}
