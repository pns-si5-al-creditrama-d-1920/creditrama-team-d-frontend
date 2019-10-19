import {Component, OnInit} from '@angular/core';
import {BankService} from 'app/services/bank.service';
import {Observable} from 'rxjs';
import {BankAccount} from '../../shared/model/bank-account';
import {OAuthService} from 'angular-oauth2-oidc';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authUser: User;

  constructor(private auth: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit() {
	// this.balance = this.accounts[0]['balance'];
	this.route.data.subscribe(data => this.auth.getAuthUser().subscribe(v => {
		console.log(v);
		this.authUser = v;
		}
	));
  }

  /*async fetchData() {

    }*/

  show() {
	console.log(this.authUser);
  }
}
