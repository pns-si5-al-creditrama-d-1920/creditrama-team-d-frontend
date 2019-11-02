import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_SERVER} from '../shared/constants/urls';
import {Observable} from 'rxjs';
import {BankTransaction} from 'app/shared/model/bank-transaction';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private route = '/bank';

  constructor(private http: HttpClient) {
  }

  getBankAccount(userId: number): Observable<any> {
    return this.http.get(URL_SERVER + this.route + '/clients/' + userId + '/bank-accounts');
  }

  addBankAccount(userId: number, balance: number): Observable<any> {
    return this.http.post(URL_SERVER + this.route + '/clients/' + userId + '/bank-accounts', balance);
  }

  updateRecipients(userId: number, newRecipient: number) {
    console.log('updateRecipients service');
    console.log(userId);
    console.log(newRecipient);
    console.log(URL_SERVER + this.route + '/' + 'clients/' + userId + '/recipients');
    return this.http.post(URL_SERVER + this.route + '/' + 'clients/' + userId + '/recipients', newRecipient);
  }

  transfer(userId: number, transaction: BankTransaction) {
    return this.http.post(URL_SERVER + this.route + '/clients/' + userId + '/transactions', transaction);
  }

  register(userName: string, userMail: string, userPassword: string) {
    return this.http.post(URL_SERVER + '/register', JSON.stringify({
      id: 0,
      username: userName,
      email: userMail,
      password: userPassword
    })).subscribe((user: User) => {
      this.addBankAccount(user.userId, 100);
    });
  }

  dump() {
    return this.http.get(URL_SERVER + '/dump');
  }
}
