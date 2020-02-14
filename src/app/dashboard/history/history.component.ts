import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {BankTransaction} from 'app/models/bank-transaction';
import {BankTransactionService} from '../../services/bank-transaction.service';
import {BankTransactionResponse} from "../../models/bank-transaction-response";


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  @Input() transactions: BankTransaction[];
  @Input() pending: boolean;

  dataSourceTransactions = new MatTableDataSource<BankTransaction>();

  historyColumns: string[] = [
    'source',
    'dest',
    'amount',
    'createdTransaction',
    'transactionState'
  ];

  pendingColumns: string[] = [
    'source',
    'dest',
    'amount',
    'createdTransaction',
    'transactionState',
    'validationCode',
    'button'
  ];

  codes: number[];

  constructor(private bankTransactionService: BankTransactionService) { }

  ngOnInit() {
    this.dataSourceTransactions = new MatTableDataSource<BankTransaction>(this.transactions);
  }

  transfer(index: number) {
    console.log(this.codes[index]);
    const transaction = {
      amount: this.transactions[index].amount,
      ibanSource: this.transactions[index].source.iban,
      ibanDest: this.transactions[index].dest.iban,
    }
    this.bankTransactionService.makeTransaction(transaction).subscribe(
      (transactionResponse: BankTransactionResponse) => {
        this.bankTransactionService.confirmCode(transactionResponse.uuid, this.codes[index]).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.error(error);
          });
      }
    );
    //console.log(this.thirdFormGroup.getRawValue());
    /*const transaction = {
      amount: this.thirdFormGroup.getRawValue().amount,
      ibanSource: this.firstFormGroup.getRawValue().sourceId,
      ibanDest: this.secondFormGroup.getRawValue().destinationId,
    };*/

    //console.log(transaction);
    /*this.bankTransactionService.makeTransaction(transaction).subscribe(
        (transactionResponse: BankTransactionResponse) => {
		  this.auth.getAuthUser(true);
		  transactionResponse.code
		  this.bankTransactionService.confirmCode(transactionResponse.uuid, code).subscribe(
			(response) => {
			  if (response) {
				swal({
				  title: 'Success',
				  text: 'Transaction acceptée !',
				  confirmButtonClass: 'btn btn-success'
				});
			  }
			},
			(error) => {
			  console.error(error);
			}
          if (!transactionResponse.code) {
            this.router.navigate(['./dashboard']);
          } else {
            swal({
              title: 'Confirmation du code',
              input: 'text',
              inputAttributes: {
                autocapitalize: 'off'
              },
              showCancelButton: false,
              confirmButtonText: 'Confirmer',
              showLoaderOnConfirm: true,
              preConfirm: (code) => {
                console.log(code);
                this.bankTransactionService.confirmCode(transactionResponse.uuid, code).subscribe(
                    (response) => {
                      if (response) {
                        this.router.navigate(['./dashboard']);
                        swal({
                          title: 'Success',
                          text: 'Transaction acceptée !',
                          confirmButtonClass: 'btn btn-success'
                        });
                      }
                    },
                    (error) => {
                      console.error(error);
                    });
              },
              allowOutsideClick: () => !swal.isLoading()
            });
          }
    });*/
	}

}
