import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs';
import {OAuthService} from 'angular-oauth2-oidc';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private auth: OAuthService, private http: HttpClient) {
  }

  ngOnInit() {
  }

  testApi() {
    this.http.get('http://localhost:8080/profiles').subscribe(v => console.log(v));
  }
}
