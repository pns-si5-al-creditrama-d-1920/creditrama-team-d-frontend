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
		let lastTransac: BankTransaction = {id: -1, destinationId: -1, sourceId: -1, amount: 0};
		this.authUser.transactions.forEach(v => {
			if (v.id > lastTransac.id) {
			lastTransac = v;
			}
		});
		if (this.authUser.userId === lastTransac.destinationId) {
			this.lastTransaction = '+' + lastTransac.amount;
		} else {
			this.lastTransaction = '-' + lastTransac.amount;
		}
		})
	);
  }

  show() {
	console.log(this.authUser);
  }
}
