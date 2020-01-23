import {User} from './user';
import {BankAccount} from './bank-account';
import {BankTransaction} from './bank-transaction';

export interface AuthUser {
  user: User;
  bankAccounts: BankAccount[];
  transactions?: BankTransaction[];
}
