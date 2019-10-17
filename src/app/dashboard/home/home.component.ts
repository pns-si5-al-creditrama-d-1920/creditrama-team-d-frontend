import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/services/login.service';
import { BankService } from 'app/services/bank.service';
import { Observable } from 'rxjs';
import { BankAccount } from '../../shared/model/bank-account';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
	message: number;
	accounts: Observable<BankAccount[]>;
	balance: number;
	mainAccount: number;

	constructor(private login: LoginService, private bank: BankService) {}

	ngOnInit() {
		this.login.currentMessage.subscribe((message) => (this.message = message));
		this.bank
			.getBankAccount(this.message)
			.subscribe(
				(bankAccount: Observable<any>) => (
					(this.accounts = bankAccount),
					(this.balance = this.accounts[0]['balance']),
					(this.mainAccount = this.accounts[0]['id'])
				)
			);
		//this.balance = this.accounts[0]['balance'];
		//this.fetchData();
	}

	/*async fetchData() {
		
	}*/

	show() {
		console.log(this.accounts);
	}
}
