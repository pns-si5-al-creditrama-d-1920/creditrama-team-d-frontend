import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() title: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  menuClick() {

    // console.log('Salut')
    // document.getElementById('main-panel').style.marginLeft = '260px';
  }
}
