import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userName: Observable<string> = of('Unknown');

  constructor(private http: HttpClient, private router: Router) {
  }

  public getUserName(id): void {
    console.log(id);
    console.log(environment.BANK_SERVICE_URL + 'clients/' + id);
    this.http.get<User>(environment.BANK_SERVICE_URL + 'clients/' + id).subscribe(
      (v: User) => {
        console.log(v);
        this.userName = of(v.username);
      }
    );
  }
}
