export interface BankAccount {
  accountNumber: string;
  balance: number;
  iban: string;
  bankCode: string;
  client: number;
  creditors: string[];
}
