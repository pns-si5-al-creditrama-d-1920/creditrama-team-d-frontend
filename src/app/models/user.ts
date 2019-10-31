import { BankAccount } from '../shared/model/bank-account';
import { BankTransaction } from 'app/shared/model/bank-transaction';

export interface User {
	userId: number;
	username: string;
	password: string;
	bankAccounts: BankAccount[];
	recipients: number[];
	transactions: BankTransaction[];
}
