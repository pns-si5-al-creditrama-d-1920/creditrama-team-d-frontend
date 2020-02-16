import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from 'app/models/user';
import {ClientService} from 'app/services/client.service';
import {MatTableDataSource} from '@angular/material/table';
import {BankAccountService} from "../services/bank-account.service";
import {BankTransactionService} from "../services/bank-transaction.service";
import {BankAccount} from "../models/bank-account";
import {BankTransaction} from 'app/models/bank-transaction';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-dump',
  templateUrl: './dump.component.html',
  styleUrls: ['./dump.component.css']
})
export class DumpComponent implements OnInit {
  @ViewChild('usersPaginator', {static: false}) paginator: MatPaginator;
  @ViewChild('transactionsPaginator', {static: false}) paginator2: MatPaginator;
  currentErrorState: boolean;
  errorRate: number;
  disabled: boolean;
  displayedColumns: string[] = [
    'userId',
    'username',
    'bankAccount',
    'bankAccount.balance',
    'recipient',
  ];
  transactionColumns: string[] = [
    'uuid',
    'source',
    'dest',
    'amount',
    'createdTransaction',
    'transactionState'
  ];
  clients: User[];
  dataSource = new MatTableDataSource<User>();
  transactionsTable = new MatTableDataSource<BankTransaction>();
  transactions: BankTransaction[];

  constructor(private clientService: ClientService, private bankAccountService: BankAccountService, private transactionService: BankTransactionService) {
  }

  ngOnInit() {
    this.transactions = [];
    this.clients = [];
    this.transactionService.getTransactionErrors().subscribe((currentState: boolean) => {
      this.currentErrorState = currentState;
    });
    this.transactionService.getErrorRate().subscribe((currentErrorRate: number) => {
      this.errorRate = currentErrorRate;
      console.log(currentErrorRate);
      console.log(this.errorRate);
    })
    this.disabled = false;
    this.clientService.dump().subscribe((clientsReturned: User[]) => {
      //console.table(clientsReturned);
      this.bankAccountService.dump().subscribe((bankAccounts: BankAccount[]) => {
        //console.table(bankAccounts);

        clientsReturned.forEach((clients, i) => {
          const ba = clients.bankAccounts.slice().map(b => b.toString());
          clientsReturned[i].bankAccounts = [];
          bankAccounts.forEach(bankAccount => {
            if (ba.includes(bankAccount.iban)) {
              clientsReturned[i].bankAccounts.push(bankAccount);
            }
          });
        });

        //console.table(clientsReturned);
        this.clients = clientsReturned;
        this.dataSource = new MatTableDataSource<User>(clientsReturned);
        this.dataSource.paginator = this.paginator;
      });

      this.transactionService.dump().subscribe((transactions: BankTransaction[]) => {
        this.transactionsTable = new MatTableDataSource<BankTransaction>(transactions);
        this.transactions = transactions;
        this.transactionsTable.paginator = this.paginator2;
      });
    });
  }

  setErrorState() {
    this.transactionService.setTransactionErrors(this.currentErrorState).subscribe(result => console.log(result));
  }

  setErrorRate() {
    this.transactionService.setErrorRate(this.errorRate).subscribe(result => console.log(result));
  }
}
