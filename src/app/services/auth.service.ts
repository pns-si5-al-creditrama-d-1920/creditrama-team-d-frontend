import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {environment} from '../../environments/environment';
import {map, mergeMap, publishReplay, refCount} from 'rxjs/operators';
import {BankAccountService} from './bank-account.service';
import {AuthUser} from '../models/auth-user';
import {BankTransactionService} from './bank-transaction.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  authUser: Observable<AuthUser>;

  constructor(private http: HttpClient, private oauthService: OAuthService, private router: Router, private bankAccount: BankAccountService,
				          private transactionService: BankTransactionService) {
  }

  public isAuthenticated(): boolean {
	const seconds = new Date().getTime() / 1000;
	if (this.oauthService.hasValidAccessToken()) {
		if (seconds - this.oauthService.getAccessTokenExpiration() < 0) {
		return true;
		}
	}
	return false;
  }

  login(username: string, password: string) {

	this.oauthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(username, password).then(() => {
		console.log('here');
		this.oauthService.getIdentityClaims();
		this.router.navigate(['/dashboard']);
	});

  }

  public getAuthUser(act: boolean = false): Observable<AuthUser> {
	if (!this.authUser || act) {
        console.log(environment.CLIENT_SERVICE_URL);
        this.authUser = this.http.get<AuthUser>(environment.CLIENT_SERVICE_URL + 'clients/auth').pipe(
            mergeMap((u: any) => {
                console.log('USER : ', u);
                return forkJoin(this.bankAccount.getAccountsById(u.userId), this.bankAccount.getAccountByIbans(u.recipients, u.userId),
                    this.transactionService.getTransactionsById(u.userId))
                    .pipe(map(([first, second, third]) => {
                        return {
                            user: u as User,
                            bankAccounts: first,
                            recipients: second,
                            transactions: third
                        } as AuthUser;
                    }));
            }),
            publishReplay(1), // this tells Rx to cache the latest emitted
            refCount()); // and this tells Rx to keep the Observable alive as long as there are any Subscribers
	}
	return this.authUser;
  }

  clearCache() {
	this.authUser = null;
  }

  logout() {
	this.clearCache();
	// remove user from local storage to log user out
	this.oauthService.logOut();
  }
}
