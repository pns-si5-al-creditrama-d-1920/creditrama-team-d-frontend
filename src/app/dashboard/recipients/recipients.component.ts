import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ClientService} from 'app/services/client.service';
import {AuthUser} from "../../models/auth-user";

declare const swal: any;

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.css']
})
export class RecipientsComponent implements OnInit {
	authUser: AuthUser;
	newRecipientIban: string;

  constructor(private auth: AuthService, private route: ActivatedRoute, private clientService: ClientService) {
  }

  ngOnInit() {
	this.auth.authUser.subscribe((v) => {
		this.authUser = v;
	});
  }

  containsRecipient(): boolean {
		for (const recipient of this.authUser.user.recipients) {
			if (recipient.iban === this.newRecipientIban) {
				return true;
			}
		}
		return false;
	}

  updateRecipients() {
		console.log('update recipients TS');
		if (!this.containsRecipient()) {
			this.clientService
					.updateRecipients(this.authUser.user.userId, this.newRecipientIban)
					.subscribe(
							(response) => {
								this.auth.getAuthUser(true).subscribe(value => this.authUser = value);
							},
							(error => {
								console.log(error);
								swal({
									title: 'Error',
									text: 'This bank account doesn\'t exist',
									confirmButtonClass: 'btn btn-danger'
								});
							}));

		} else {
		swal({
		title: 'Error',
		text: 'This bank account is already one of your recipients',
		confirmButtonClass: 'btn btn-danger'
		});
	}
  }
}
