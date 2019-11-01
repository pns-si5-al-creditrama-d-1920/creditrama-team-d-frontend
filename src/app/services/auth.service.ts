import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {environment} from '../../environments/environment';
import {publishReplay, refCount} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private oauthService: OAuthService, private router: Router) {
  }
  authUser: Observable<User>;

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
	  this.oauthService.getIdentityClaims();
		this.router.navigate(['/dashboard']);
	});

  }

  public getAuthUser(act: boolean = false): Observable<User> {
	if (!this.authUser || act) {
	  console.log(environment.BANK_SERVICE_URL);
		this.authUser = this.http.get<User>(environment.BANK_SERVICE_URL + 'clients/auth').pipe(
		publishReplay(1), // this tells Rx to cache the latest emitted
		refCount() // and this tells Rx to keep the Observable alive as long as there are any Subscribers
		);
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
