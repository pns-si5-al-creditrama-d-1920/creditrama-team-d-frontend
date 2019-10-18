import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: any = { username: ''};

  constructor(private http: HttpClient, private oauthService: OAuthService, private router: Router) {
  }


  public isAuthenticated(): boolean {
    const seconds = new Date().getTime() / 1000;
    if (this.oauthService.hasValidAccessToken() && this.user !== null) {
      if (seconds - this.oauthService.getAccessTokenExpiration() < 0) {
        return true;
      }
    }
    return false;
  }

  login(username: string, password: string) {

    this.oauthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(username, password).then(() => {
      const {principal}: any = this.oauthService.getIdentityClaims();
      this.user = principal;
      this.router.navigate(['/dashboard']);
    });

  }

  logout() {
    // remove user from local storage to log user out
    this.oauthService.logOut();
  }
}
