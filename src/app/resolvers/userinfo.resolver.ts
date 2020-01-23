import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';
import {AuthUser} from '../models/auth-user';

@Injectable({
  providedIn: 'root'
})
export class UserInfoResolver implements Resolve<AuthUser> {
  constructor(private auth: AuthService) {
  }

  resolve(): Observable<AuthUser> {
	return this.auth.getAuthUser();
  }
}
