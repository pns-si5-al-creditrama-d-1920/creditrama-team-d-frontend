import { BankAccount } from '../shared/model/bank-account';

export interface User {
	userId: number;
	username: string;
	password: string;
	bankAccounts: BankAccount[];
	recipients: number[];
}
