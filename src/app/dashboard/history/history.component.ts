import {Component, OnInit, Input, ViewChild, AfterViewInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {BankTransaction} from 'app/models/bank-transaction';
import {BankTransactionService} from '../../services/bank-transaction.service';
import {MatPaginator} from '@angular/material';

declare const swal: any;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, AfterViewInit {
  @Input() transactions: BankTransaction[];
  @Input() pending: boolean;

  @ViewChild('transactionsPaginator', {static: false}) paginator: MatPaginator;

  dataSourceTransactions = new MatTableDataSource<BankTransaction>();

  historyColumns: string[] = [
    'transactionId',
    'source',
    'dest',
    'amount',
    'createdTransaction',
    'transactionState'
  ];

  pendingColumns: string[] = [
    'transactionId',
    'source',
    'dest',
    'amount',
    'createdTransaction',
    'transactionState',
    'validationCode',
    'button'
  ];

  codes: number[];

  constructor(private bankTransactionService: BankTransactionService) {
  }

  ngOnInit() {
    let counter = 1;
    this.dataSourceTransactions = new MatTableDataSource<BankTransaction>(this.transactions.map((transaction: any) => {
      transaction.transactionId = counter;
      counter++;
      return transaction;
    }));
  }

  ngAfterViewInit() {
	this.dataSourceTransactions.paginator = this.paginator;
  }

  transfer(element) {
	console.log(element);
	if (!element.code) {
		return;
	}
	this.bankTransactionService.confirmCode(element.uuid, element.code).subscribe(
		(response) => {
			console.log(response);
			if (response === 'OK') {
			window.location.reload();
			} else if (response === 'EXPECTATION_FAILED') {
			swal({
				title: 'Erreur de confirmation',
				text: 'Un problème est survenu lors de la confirmation, veuillez réessayer',
			});
			element.code = '';
			}
		},
		(error) => {
			console.error(error);
			swal({
			title: 'Erreur de confirmation',
			text: 'Un problème est survenu lors de la confirmation, veuillez réessayer',
			});
		});
  }
}
