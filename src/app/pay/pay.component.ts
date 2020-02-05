import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  cardNumber = '';
  owner = '';
  cvc = '';

  constructor() {
  }

  ngOnInit() {
  }

  onPay() {
    console.table({cardNumber: this.cardNumber, owner: this.owner, cvc: this.cvc});
  }
}
