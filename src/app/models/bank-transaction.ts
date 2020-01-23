import {BankAccount} from './bank-account';
// Maybe we should do a "DTO" for source and dest
export interface BankTransaction {
  uuid: string;
  source: BankAccount;
  dest: BankAccount;
  amount: number;
  createdTransaction: Date;
  transactionState: string;
}
