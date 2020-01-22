import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {environment} from '../../environments/environment';
import {BankTransactionRequest} from '../models/bank-transaction-request';

@Injectable()
export class ClientService {
  private route = 'bank';

  constructor(private http: HttpClient) {
  }

  getBankAccounts(userId: number): Observable<any> {
      return this.http.get(environment.CLIENT_SERVICE_URL + 'clients/' + userId + '/bank-accounts');
  }

  addBankAccount(userId: number, balance: number): Observable<any> {
    return this.http.post(environment.CLIENT_SERVICE_URL + 'clients/' + userId + '/bank-accounts', balance);
  }

  updateRecipients(userId: number, newRecipient: string) {
    console.log('updateRecipients service');
    console.log(userId);
    console.log(newRecipient);
    console.log(environment.CLIENT_SERVICE_URL + 'clients/' + userId + '/recipients');
    return this.http.post(environment.CLIENT_SERVICE_URL + 'clients/' + userId + '/recipients', newRecipient);
  }

  transfer(userId: number, transaction: BankTransactionRequest) {
    return this.http.post(environment.CLIENT_SERVICE_URL + 'clients/' + userId + '/transactions', transaction);
  }

  registerWithBankAccount(userName: string, userMail: string, userPassword: string) {
	this.register(userName, userMail, userPassword).subscribe((u: User) => {
		console.info('par ici', u.username);
		this.addBankAccount(u.userId, 100);
	});
  }

  register(userName: string, userMail: string, userPassword: string): Observable<any> {
      return this.http.post(environment.CLIENT_SERVICE_URL + 'register', {
        email: userMail,
        password: userPassword,
        username: userName
      });
  }

  dump(): Observable<any> {
    return this.http.get(environment.CLIENT_SERVICE_URL + 'dump');
  }
}
