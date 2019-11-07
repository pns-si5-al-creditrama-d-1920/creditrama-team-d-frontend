import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {BankTransaction} from '../../shared/model/bank-transaction';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authUser: User;
  mainAccount: number;
  lastTransaction = 'Aucune transaction';

  constructor(private auth: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit() {
	// this.balance = this.accounts[0]['balance'];
	this.route.data.subscribe((data) =>
		this.auth.getAuthUser().subscribe((v) => {
		console.log(v);
		this.authUser = v;
		this.mainAccount = this.authUser.bankAccounts[0].bankAccountId;
		let lastTransac: BankTransaction = {bankTransactionId: -1, destinationId: -1, sourceId: -1, amount: 0};
		this.authUser.bankTransactions.forEach(trans => {
			if (trans.bankTransactionId > lastTransac.bankTransactionId) {
			lastTransac = trans;
			}
		});
		if (this.authUser.userId === lastTransac.destinationId) {
			this.lastTransaction = '+' + lastTransac.amount + '€';
		} else if (lastTransac.destinationId !== -1) {
			this.lastTransaction = '-' + lastTransac.amount + '€';
		}
		})
	);
  }
}
