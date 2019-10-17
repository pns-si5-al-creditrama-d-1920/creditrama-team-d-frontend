import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/services/login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	message: number;

	constructor(private login: LoginService) {}

	ngOnInit() {
		this.login.currentMessage.subscribe((message) => (this.message = message));
	}

	loginBtn() {
		this.login.changeMessage(5);
	}
}
