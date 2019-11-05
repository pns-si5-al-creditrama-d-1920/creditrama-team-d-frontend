import {Component, OnInit} from '@angular/core';
import {BankAccount} from 'app/shared/model/bank-account';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {BankService} from 'app/services/bank.service';
import {User} from '../../models/user';
import {BankTransaction} from 'app/shared/model/bank-transaction';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  authUser: User;
  myAccounts: BankAccount[];
  myRecipients: number[];
  transferAmount: number;
  selectedAccount: number;
  selectedRecipient: number;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  transaction: BankTransaction = new BankTransaction();

  constructor(private auth: AuthService, private route: ActivatedRoute, private bankService: BankService, private _formBuilder: FormBuilder, private userService: UserService) {
  }


  ngOnInit() {
    this.auth.authUser.subscribe((v) => {
      console.log(v);
      this.authUser = v;
      console.log(this.authUser.recipients);
      this.myRecipients = this.authUser.recipients;
      this.myAccounts = this.authUser.bankAccounts;
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
    this.transaction.sourceId = this.firstFormGroup.getRawValue().sourceId;
    this.transaction.destinationId = this.secondFormGroup.getRawValue().destinationId;

    console.log(this.transaction);
    this.bankService.transfer(this.authUser.userId, this.transaction).subscribe((response) => console.log(response));
    this.auth.getAuthUser(true);
  }

}
