import {BankAccount} from '../shared/model/bank-account';

export interface User {
  id: number;
  username: string;
  password: string;
  bankAccounts: BankAccount[];
  recipients: string[];
}
