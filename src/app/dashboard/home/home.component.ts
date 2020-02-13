import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AuthUser} from '../../models/auth-user';
import { HistoryComponent } from './../history/history.component';
import { BankTransaction } from 'app/models/bank-transaction';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authUser: AuthUser;
  lastTransaction = 'Aucune transaction';
  totalBalance: number;
  pendingTransactions: BankTransaction[];

  constructor(private auth: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit() {
	this.pendingTransactions = [];
	// this.balance = this.accounts[0]['balance']; 
	this.route.data.subscribe((data) =>
		this.auth.getAuthUser().subscribe((v) => {
		console.log(v);
    	this.authUser = v;
		this.totalBalance = v.bankAccounts.map(nb => nb.balance).reduce((a, b) => a + b, 0);
		if (this.authUser.transactions.length !== 0) {
			this.authUser.transactions.sort((a, b) => (a.createdTransaction.getTime() > b.createdTransaction.getTime()) ? 1 : -1);
			this.authUser.transactions.map(transaction => {
				console.log(transaction.transactionState);
				if (transaction.transactionState === 'PENDING') {
					console.log(transaction);
					console.log('is pending');
					this.pendingTransactions.push(transaction);
				}
			});
			const lastTransact = this.authUser.transactions[this.authUser.transactions.length - 1];
			if (this.authUser.user.userId === lastTransact.dest.client) {
				this.lastTransaction = '+' + lastTransact.amount + '€';
			} else {
				this.lastTransaction = '-' + lastTransact.amount + '€';
			}

		}
		}));
  }
}
