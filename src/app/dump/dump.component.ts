import {Component, OnInit} from '@angular/core';
import {User} from 'app/models/user';
import {ClientService} from 'app/services/client.service';
import {MatTableDataSource} from '@angular/material/table';
import {BankAccountService} from "../services/bank-account.service";
import {BankTransactionService} from "../services/bank-transaction.service";
import {BankAccount} from "../models/bank-account";

@Component({
  selector: 'app-dump',
  templateUrl: './dump.component.html',
  styleUrls: ['./dump.component.css']
})
export class DumpComponent implements OnInit {
  displayedColumns: string[] = [
    'userId',
    'username',
    'bankAccount',
    'bankAccount.balance',
    'recipient',
    /*'transaction.sourceId',
    'transaction.destinationId',
    'transaction.amount'*/
  ];
  clients: User[];
  dataSource = new MatTableDataSource<User>();

  constructor(private clientService: ClientService, private bankAccountService: BankAccountService, private transactionService: BankTransactionService) {
  }

  ngOnInit() {
    this.clientService.dump().subscribe((clientsReturned: User[]) => {
      console.table(clientsReturned);
      this.bankAccountService.dump().subscribe((bankAccounts: BankAccount[]) => {
        console.table(bankAccounts);

        clientsReturned.forEach((clients, i) => {
          const ba = clients.bankAccounts.slice().map(b => b.toString());
          clientsReturned[i].bankAccounts = [];
          bankAccounts.forEach(bankAccount => {
            if (ba.includes(bankAccount.iban)) {
              clientsReturned[i].bankAccounts.push(bankAccount);
            }
          });
        });

        console.table(clientsReturned);
        this.clients = clientsReturned;
      });

      this.transactionService.dump().subscribe(transactions => {
        console.log(transactions);
      });

      this.clients = clientsReturned;
      this.dataSource = new MatTableDataSource<User>(this.clients);
    });
  }
}
