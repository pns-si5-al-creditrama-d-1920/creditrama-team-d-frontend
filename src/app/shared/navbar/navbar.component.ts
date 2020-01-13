import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() title: string;

  constructor() {
  }

  ngOnInit() {
  }

  menuClick() {

    // console.log('Salut')
    // document.getElementById('main-panel').style.marginLeft = '260px';
  }
}
