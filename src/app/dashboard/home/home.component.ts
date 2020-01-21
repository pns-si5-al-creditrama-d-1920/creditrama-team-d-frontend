import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {BankTransaction} from '../../models/bank-transaction';
import {AuthUser} from '../../models/auth-user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authUser: AuthUser;
  lastTransaction = 'Aucune transaction';
  totalBalance: number;

  constructor(private auth: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit() {
	// this.balance = this.accounts[0]['balance'];
	this.route.data.subscribe((data) =>
		this.auth.getAuthUser().subscribe((v) => {
		console.log(v);
		this.authUser = v;
		this.totalBalance = v.bankAccounts.map(nb => nb.balance).reduce((a, b) => a + b, 0);
		if (this.authUser.transactions.length !== 0) {
			this.authUser.transactions.sort((a, b) => (a.createdTransaction.getTime() > b.createdTransaction.getTime()) ? 1 : -1);
			const lastTransact = this.authUser.transactions[0];
			if (this.authUser.user.userId === lastTransact.dest.client) {
			this.lastTransaction = '+' + lastTransact.amount + '€';
			} else {
			this.lastTransaction = '-' + lastTransact.amount + '€';
			}
		}
		}));
  }
}
