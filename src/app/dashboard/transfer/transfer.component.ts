import {Component, OnInit} from '@angular/core';
import {BankAccount} from 'app/models/bank-account';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ClientService} from 'app/services/client.service';
import {User} from '../../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {BankTransactionRequest} from '../../models/bank-transaction-request';
import {BankTransactionService} from 'app/services/bank-transaction.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  authUser: User;
  myAccounts: BankAccount[];
  myRecipients: BankAccount[];
  transferAmount: number;
  selectedAccount: number;
  selectedRecipient: number;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  transaction: BankTransactionRequest;

  constructor(private auth: AuthService, private route: ActivatedRoute, private bankService: ClientService, private _formBuilder: FormBuilder, private userService: UserService, private bankTransactionService: BankTransactionService) {
  }


  ngOnInit() {
    this.transaction = new BankTransactionRequest();
    this.auth.authUser.subscribe((v) => {
      console.log(v);
      this.authUser = v.user;
      this.myRecipients = v.recipients;
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
    this.transaction.amount = this.thirdFormGroup.getRawValue().amount;
    this.transaction.ibanSource = this.firstFormGroup.getRawValue().sourceId;
    this.transaction.ibanDest = this.secondFormGroup.getRawValue().destinationId;

    console.log(this.transaction);
    this.bankTransactionService.makeTransaction(this.transaction).subscribe((response) => console.log(response));
    this.auth.getAuthUser(true);
  }

}
