import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {BankTransaction} from 'app/models/bank-transaction';


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

  constructor() { }

  ngOnInit() {
    this.dataSourceTransactions = new MatTableDataSource<BankTransaction>(this.transactions);
    console.log(this.pending);
  }

}
