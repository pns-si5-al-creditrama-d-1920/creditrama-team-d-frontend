import {Component, OnInit} from '@angular/core';
import {BankAccount} from 'app/models/bank-account';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ClientService} from 'app/services/client.service';
import {User} from '../../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Recipient} from '../../models/recipient';
import {BankTransactionService} from '../../services/bank-transaction.service';

declare const swal: any;

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  authUser: User;
  myAccounts: BankAccount[];
  myRecipients: Recipient[];
  transferAmount: number;
  selectedAccount: number;
  selectedRecipient: number;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private auth: AuthService, private route: ActivatedRoute, private bankService: ClientService, private _formBuilder: FormBuilder,
              private userService: UserService, private bankTransactionService: BankTransactionService, private router: Router) {
  }


  ngOnInit() {
    this.auth.authUser.subscribe((v) => {
      console.log(v);
      this.authUser = v.user;
      this.myRecipients = v.user.recipients;
      this.myAccounts = v.bankAccounts;
    });

    this.firstFormGroup = this._formBuilder.group({
      sourceId: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      destinationId: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      amount: [0, Validators.compose(
          [Validators.min(1), Validators.required])]
    });
  }

  transfer() {
    console.log(this.thirdFormGroup.getRawValue());
    const transaction = {
      amount: this.thirdFormGroup.getRawValue().amount,
      ibanSource: this.firstFormGroup.getRawValue().sourceId,
      ibanDest: this.secondFormGroup.getRawValue().destinationId,
    };

    console.log(transaction);
    this.bankTransactionService.makeTransaction(transaction).subscribe(
      (response) => {
        this.auth.getAuthUser(true);
        this.router.navigate(['./dashboard']);
      },
      (error => {
        swal({
          title: 'Error',
          text: 'Error while processing the transaction. Please retry.',
          confirmButtonClass: 'btn btn-danger'
        });
        this.router.navigate(['./dashboard']);
      }));
  }

}
