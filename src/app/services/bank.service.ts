import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_SERVER} from '../shared/constants/urls';
import {Observable} from 'rxjs';
import {BankTransaction} from 'app/shared/model/bank-transaction';
import {User} from '../models/user';

@Injectable()
export class BankService {
  private route = '/bank';

  constructor(private http: HttpClient) {
  }

  getBankAccounts(userId: number): Observable<any> {
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

  registerWithBankAccount(userName: string, userMail: string, userPassword: string) {
    this.register(userName, userMail, userPassword).subscribe((u: User) => {
      console.info('par ici', u.username);
      this.addBankAccount(u.userId, 100);
    })
  }

  register(userName: string, userMail: string, userPassword: string): Observable<any> {
    return this.http.post(URL_SERVER + '/register', {
      email: userMail,
      password: userPassword,
      username: userName
    });
  }

  dump(): Observable<any> {
    return this.http.get(URL_SERVER + '/dump');
  }
}
