import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  loginBtn() {
    console.log(this.username, this.password);
    this.authService.login(this.username, this.password);
  }
}
