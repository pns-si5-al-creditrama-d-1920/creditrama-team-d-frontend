import { Component, OnInit } from '@angular/core';
import { BankAccount } from 'app/shared/model/bank-account';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BankService } from 'app/services/bank.service';
import { User } from '../../models/user';
import { BankTransaction } from 'app/shared/model/bank-transaction';

@Component({
	selector: 'app-transfer',
	templateUrl: './transfer.component.html',
	styleUrls: [ './transfer.component.css' ]
})
export class TransferComponent implements OnInit {
	authUser: User;
	myAccounts: BankAccount[];
	myRecipients: number[];
	transferAmount: number;
	selectedAccount: number;
	selectedRecipient: number;

	constructor(private auth: AuthService, private route: ActivatedRoute, private bankService: BankService) {}

	ngOnInit() {
		this.route.data.subscribe((data) =>
			this.auth.getAuthUser().subscribe((v) => {
				this.authUser = v;
				this.myRecipients = this.authUser.recipients;
				this.myAccounts = this.authUser.bankAccounts;
			})
		);
	}

	transfer() {
		let transaction = new BankTransaction();
		transaction.amount = this.transferAmount;
		transaction.sourceId = this.selectedAccount;
		transaction.destinationId = this.selectedRecipient;
		if (
			this.myAccounts.find(
				(account) => account.bankAccountId == this.selectedAccount && account.balance >= this.transferAmount
			) != null
		) {
			this.bankService.transfer(this.authUser.userId, transaction).subscribe((response) => console.log(response));
		}
	}
}
