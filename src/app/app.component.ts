import {Component} from '@angular/core';
import {environment} from '../environments/environment';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private oauthService: OAuthService) {
    this.oauthService.oidc = false;
    // Login-Url
    this.oauthService.tokenEndpoint = environment.AUTHORIZATION_SERVICE_URL + 'oauth/token';
    this.oauthService.requireHttps = false;

    // Url with user info endpoint
    // This endpont is described by OIDC and provides data about the loggin user
    // This sample uses it, because we don't get an id_token when we use the password flow
    // If you don't want this lib to fetch data about the user (e. g. id, name, email) you can skip this line
    this.oauthService.userinfoEndpoint = environment.AUTHORIZATION_SERVICE_URL + 'user/me';


    // The SPA's id. Register SPA with this id at the auth-server
    this.oauthService.clientId = 'mobile';

    // set the scope for the permissions the client should request
    this.oauthService.scope = 'READ WRITE';

    // Set a dummy secret
    // Please note that the auth-server used here demand the client to transmit a client secret, although
    // the standard explicitly cites that the password flow can also be used without it. Using a client secret
    // does not make sense for a SPA that runs in the browser. That's why the property is called dummyClientSecret
    // Using such a dummy secret is as safe as using no secret.
    this.oauthService.dummyClientSecret = 'pin';
    this.oauthService.logoutUrl = window.location.origin + '/login';
  }
}
