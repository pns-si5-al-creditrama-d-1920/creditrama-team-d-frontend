import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {BankTransaction} from 'app/models/bank-transaction';
import {BankTransactionService} from '../../services/bank-transaction.service';
import {BankTransactionResponse} from '../../models/bank-transaction-response';
import {MatPaginator} from '@angular/material';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  @Input() transactions: BankTransaction[];
  @Input() pending: boolean;

  @ViewChild('transactionsPaginator', {static: false}) paginator: MatPaginator;

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

  constructor(private bankTransactionService: BankTransactionService) {
  }

  ngOnInit() {
    this.dataSourceTransactions = new MatTableDataSource<BankTransaction>(this.transactions);

  }

  ngAfterViewInit() {
    this.dataSourceTransactions.paginator = this.paginator;
  }

  transfer(element) {
    console.log(element);
    this.bankTransactionService.confirmCode(element.uuid, element.code).subscribe(
     (response) => {
          console.log(response);
        },
     (error) => {
          console.error(error);
        });
  }
}
