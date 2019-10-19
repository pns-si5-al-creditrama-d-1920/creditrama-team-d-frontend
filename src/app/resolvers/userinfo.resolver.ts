import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserInfoResolver implements Resolve<User> {
  constructor(private auth: AuthService) {
  }

  resolve(): Observable<User> {
	return this.auth.getAuthUser();
  }
}
