import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVER } from '../shared/constants/urls';
import { Observable } from 'rxjs';
import { BankAccount } from 'app/shared/model/bank-account';

@Injectable({
	providedIn: 'root'
})
export class BankService {
	private route = '/bank';

	constructor(private http: HttpClient) {}

	getBankAccount(userId: number): Observable<any> {
		return this.http.get(URL_SERVER + this.route + '/' + userId + '/bank/accounts');
	}
}
