import {Recipient} from './recipient';
import {BankAccount} from "./bank-account";

export interface User {
  userId: number;
  username: string;
  password: string;
  email: string;
  recipients: Recipient[];
  bankAccounts: BankAccount[];
}
