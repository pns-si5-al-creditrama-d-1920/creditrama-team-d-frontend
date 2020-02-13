import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Card} from "../models/card";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) {
  }

  getCard(cardNumber: number): Observable<Card> {
    return this.http.get<Card>(environment.CARD_SERVICE_URL + 'cards/' + cardNumber);
  }

  getCards(userId: number): Observable<Card[]> {
    return this.http.get<Card[]>(environment.CARD_SERVICE_URL + 'clients/' + userId + '/cards');
  }

  // TODO
  /*dump(): Observable<any> {
    return this.http.get(environment.CARD_SERVICE_URL + 'dump');
  }*/
}
