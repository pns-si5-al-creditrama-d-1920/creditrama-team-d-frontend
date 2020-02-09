import {User} from './user';
import {BankAccount} from './bank-account';
import {BankTransaction} from './bank-transaction';
import {Card} from "./card";

export interface AuthUser {
  user: User;
  bankAccounts: BankAccount[];
  transactions?: BankTransaction[];
  cards: Card[];
}
