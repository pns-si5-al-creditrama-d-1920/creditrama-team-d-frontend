import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {BankService} from 'app/services/bank.service';

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.css']
})
export class RecipientsComponent implements OnInit {
  newRecipient: number;
  currentRecipients: number[];

  constructor(private auth: AuthService, private route: ActivatedRoute, private bankService: BankService) {
  }

  ngOnInit() {
	this.auth.authUser.subscribe(v => this.currentRecipients = v.recipients);
  }

  updateRecipients() {
	console.log('update recipients TS');
	if (!this.currentRecipients.includes(this.newRecipient)) {
		this.currentRecipients.push(this.newRecipient);
		this.auth.authUser.subscribe(v => {
		this.bankService
			.updateRecipients(v.userId, this.newRecipient)
			.subscribe((response) => console.log(response));
		});

	}
}
}
