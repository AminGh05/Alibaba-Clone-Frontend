export interface TransactionDto {
  id: number;
  transactionTypeId: number;
  accountId: number;
  ticketOrderId?: number;
  baseAmount: number;
  finalAmount: number;
  serialNumber: string;
  createdAt: Date | string;
  description?: string;
  transactionType: string;
}
