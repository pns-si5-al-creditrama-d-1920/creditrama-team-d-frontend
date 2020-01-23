import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {BankTransaction} from '../models/bank-transaction';
import {map} from 'rxjs/operators';
import {BankTransactionRequest} from 'app/models/bank-transaction-request';

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

  makeTransaction(transaction: BankTransactionRequest) {
    return this.http.post(environment.TRANSACTION_SERVICE_URL + 'transactions', transaction);
  }

  dump(): Observable<any> {
    return this.http.get(environment.TRANSACTION_SERVICE_URL + 'dump');
  }
}
