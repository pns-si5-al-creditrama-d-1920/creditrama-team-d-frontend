import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {BankService} from 'app/services/bank.service';
import {User} from "../../models/user";

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.css']
})
export class RecipientsComponent implements OnInit {
  authUser: User;
  newRecipient: number;
  currentRecipients: number[];

  constructor(private auth: AuthService, private route: ActivatedRoute, private bankService: BankService) {
  }

  ngOnInit() {
	this.auth.authUser.subscribe((v) => {
	  this.authUser = v;
    this.currentRecipients = this.authUser.recipients;
  });
  }

  updateRecipients() {
	console.log('update recipients TS');
	if (!this.currentRecipients.includes(this.newRecipient)) {
		// this.currentRecipients.push(this.newRecipient);
		this.auth.authUser.subscribe(v => {
		this.bankService
			.updateRecipients(v.userId, this.newRecipient)
			.subscribe((response) => console.log(response));
		});
    this.auth.getAuthUser(true);
	}
}
}
