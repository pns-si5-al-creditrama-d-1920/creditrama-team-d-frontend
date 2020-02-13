import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../../models/card";

@Component({
  selector: 'app-debit-card',
  templateUrl: './debit-card.component.html',
  styleUrls: ['./debit-card.component.css']
})
export class DebitCardComponent implements OnInit {
  cardNumberHTML: string;
  owner: string;
  expiryMonth: string;
  expiryYear: string;

  @Input() card: Card;

  constructor() {
  }

  private static displayTwoDigits(number: number): string {
    if (number < 10) {
      return "0" + number;
    }
    if (number > 999) {
      return number.toString()[2] + number.toString()[3];
    }
    return number.toString();
  }

  ngOnInit() {
    const {number, owner, expiryDate} = this.card;
    const date = new Date(expiryDate);
    this.owner = owner;
    this.expiryMonth = DebitCardComponent.displayTwoDigits(date.getMonth() + 1);
    this.expiryYear = DebitCardComponent.displayTwoDigits(date.getFullYear());

    for (let i = 0; i < 4; i++) {
      this.cardNumberHTML += "<span>" + number.toString().slice(i, i + 4) + "</span>";
    }
  }
}
