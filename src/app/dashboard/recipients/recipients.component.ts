import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ClientService} from 'app/services/client.service';
import {User} from '../../models/user';
import {BankAccount} from '../../models/bank-account';
import {Recipient} from '../../models/recipient';

declare const swal: any;

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.css']
})
export class RecipientsComponent implements OnInit {
  authUser: User;
  newRecipientIban: string;
  currentRecipients: Recipient[];

  constructor(private auth: AuthService, private route: ActivatedRoute, private clientService: ClientService) {
  }

  ngOnInit() {
	this.auth.authUser.subscribe((v) => {
		this.authUser = v.user;
		this.currentRecipients = v.user.recipients;
	});
  }

  containsRecipient(): boolean {
	for (const recipient of this.currentRecipients) {
		if (recipient.iban === this.newRecipientIban) {
		return true;
		}
	}
	return false;
  }

  updateRecipients() {
		console.log('update recipients TS');
		if (!this.containsRecipient()) {
		this.auth.authUser.subscribe(v => {
		this.clientService
			.updateRecipients(v.user.userId, this.newRecipientIban)
			.subscribe(
			(response) => this.currentRecipients.push(response as Recipient),
			(error => {
				console.log(error);
				swal({
				title: 'Error',
				text: 'This bank account doesn\'t exist',
				confirmButtonClass: 'btn btn-danger'
				});
			}));
		});
		this.auth.getAuthUser(true);
	} else {
		swal({
		title: 'Error',
		text: 'This bank account is already one of your recipients',
		confirmButtonClass: 'btn btn-danger'
		});
	}
  }
}
