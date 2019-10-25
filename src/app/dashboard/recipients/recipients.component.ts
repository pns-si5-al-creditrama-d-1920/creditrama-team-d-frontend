import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BankService } from 'app/services/bank.service';

@Component({
	selector: 'app-recipients',
	templateUrl: './recipients.component.html',
	styleUrls: [ './recipients.component.css' ]
})
export class RecipientsComponent implements OnInit {
	authUser: User;
	newRecipient: number;
	currentRecipients: number[];

	constructor(private auth: AuthService, private route: ActivatedRoute, private bankService: BankService) {}

	ngOnInit() {
		this.route.data.subscribe((data) =>
			this.auth.getAuthUser().subscribe((v) => {
				console.log(v);
				this.authUser = v;
				console.log(this.authUser.recipients);
				this.currentRecipients = this.authUser.recipients;
			})
		);
	}

	updateRecipients() {
		console.log('update recipients TS');
		if (!this.currentRecipients.includes(this.newRecipient)) {
			this.currentRecipients.push(this.newRecipient);
			console.log(this.authUser);
			console.log(this.authUser.userId);
			this.bankService
				.updateRecipients(this.authUser.userId, this.newRecipient)
				.subscribe((response) => console.log(response));
		}
	}
}
