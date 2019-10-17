import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	private messageSource = new BehaviorSubject(5);
	currentMessage = this.messageSource.asObservable();

	constructor() {}

	changeMessage(message: number) {
		this.messageSource.next(message);
	}
}
