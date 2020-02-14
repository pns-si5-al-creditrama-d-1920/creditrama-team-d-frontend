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

  transfer(index) {
    this.bankTransactionService.confirmCode(this.transactions[index].uuid, this.codes[index]).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        });
  }
}
