import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BankAccount} from '../models/bank-account';
import {environment} from '../../environments/environment';
import {BankTransaction} from '../models/bank-transaction';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BankTransactionService {

  constructor(private http: HttpClient) {
  }

  getTransactionsById(id: number): Observable<BankTransaction[]> {
	return this.http.get<BankTransaction[]>(environment.TRANSACTION_SERVICE_URL + 'clients/' + id + '/transactions').pipe(map(v => {
		return v.map((trans: any) => {
		trans.createdTransaction = new Date(trans.createdTransaction);
		return trans;
		});
	}));
  }
}
