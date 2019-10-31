import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/user';
import { BankService } from 'app/services/bank.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-dump',
	templateUrl: './dump.component.html',
	styleUrls: [ './dump.component.css' ]
})
export class DumpComponent implements OnInit {
	displayedColumns: string[] = [
		'userId',
		'username',
		'bankAccount',
		'recipient',
		'transaction.sourceId',
		'transaction.destinationId',
		'transaction.amount'
	];
	clients: User[];
	dataSource = new MatTableDataSource<User>();

	constructor(private bankService: BankService) {}

	ngOnInit() {
		this.bankService.dump().subscribe((clientsReturned: User[]) => {
			this.clients = clientsReturned;
			this.dataSource = new MatTableDataSource<User>(this.clients);
		});
	}
}
