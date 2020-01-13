import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ClientService} from 'app/services/client.service';
import {User} from '../../models/user';
import {BankAccount} from '../../models/bank-account';

declare const swal: any;

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.css']
})
export class RecipientsComponent implements OnInit {
  authUser: User;
  newRecipient: number;
  currentRecipients: BankAccount[];

  constructor(private auth: AuthService, private route: ActivatedRoute, private bankService: ClientService) {
  }

  ngOnInit() {
    this.auth.authUser.subscribe((v) => {
      this.authUser = v.user;
      this.currentRecipients = v.recipients;
    });
  }

  updateRecipients() {
    /**
     console.log('update recipients TS');
     if (!this.currentRecipients.includes(this.newRecipient)) {
      this.auth.authUser.subscribe(v => {
        this.bankService
          .updateRecipients(v.userId, this.newRecipient)
          .subscribe(
            (response) => this.currentRecipients.push(this.newRecipient),
            (error => swal({
              title: 'Error',
              text: 'This bank account doesn\'t exist',
              confirmButtonClass: 'btn btn-danger'
            })));
      });
      this.auth.getAuthUser(true);
    } else {
      swal({
        title: 'Error',
        text: 'This bank account is already one of your recipients',
        confirmButtonClass: 'btn btn-danger'
      });
    }**/
  }
}
