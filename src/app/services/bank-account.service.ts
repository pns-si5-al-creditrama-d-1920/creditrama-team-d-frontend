import {Injectable} from '@angular/core';
import {BankAccount} from '../models/bank-account';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  constructor(private http: HttpClient) {
  }

  getAccountByIban(iban: string): Observable<BankAccount> {
    return this.http.get<BankAccount>(environment.BANKACCOUNT_SERVICE_URL + 'accounts/' + iban);
  }

  getRecipientsByIbans(id: number): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(environment.CLIENT_SERVICE_URL + 'clients/' + id + '/recipients');
  }

  getAccountsById(id: number): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(environment.BANKACCOUNT_SERVICE_URL + 'clients/' + id + '/accounts');
  }

  dump(): Observable<any> {
    return this.http.get(environment.BANKACCOUNT_SERVICE_URL + 'dump');
  }
}
