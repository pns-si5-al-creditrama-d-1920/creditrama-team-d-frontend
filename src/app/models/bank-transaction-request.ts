export interface BankTransactionRequest {
  ibanSource: string;
  ibanDest: string;
  amount: number;
}
