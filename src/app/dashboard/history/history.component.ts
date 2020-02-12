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
  dataSourceTransactions = new MatTableDataSource<BankTransaction>();

  transactionColumns: string[] = [
    'source',
    'dest',
    'amount',
    'createdTransaction',
    'transactionState'
  ];

  constructor() { }

  ngOnInit() {
    this.dataSourceTransactions = new MatTableDataSource<BankTransaction>(this.transactions);
  }

}
