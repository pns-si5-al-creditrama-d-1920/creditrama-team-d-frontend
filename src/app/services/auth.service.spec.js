import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {OAuthLogger, OAuthService, UrlHelperService} from 'angular-oauth2-oidc';
import {BankService} from './bank.service';

describe('AuthService', () => {
  let authService;
  let bankService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [OAuthService, UrlHelperService, OAuthLogger, BankService],
    });

    authService = TestBed.get(AuthService);
    bankService = TestBed.get(BankService);
  });
/*
  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should return false because no logged in users', () => {
    expect(authService.isAuthenticated()).toBeFalsy();
  });

  it('should log the user', () => {
    //bankService.getBankAccount(0);

    bankService.register('agardin', 'alexisgardin@gmail.com', 'TT829').subscribe((user: any) => {
      bankService.addBankAccount(user.userId, 100);
      throw new Error('User couldn\'t be created');
      return user;
    });
    authService.login('agardin', 'TT829');
    expect(authService.isAuthenticated()).toBeTruthy();
  });

  it('should not log the user, because he is not registered', () => {
    authService.login('lalala', 'bla');
    expect(authService.isAuthenticated()).toBeFalsy();
  });

  it('should return authenticated user', () => {
    authService.login('agardin', 'TT829');
    expect(authService.isAuthenticated()).toBeTruthy();
    authService.getAuthUser().subscribe((user: User) => {
      expect(user.username).toBe('agardin');
      expect(user.password).toBe('TT829');
    }, (error) => {
      console.log(error);
    });
  });

  it('should clear cache', () => {
    authService.clearCache();
    authService.getAuthUser().subscribe((user: User) => {
      expect(user).toBeNull();
    }, (error) => {
      console.log(error);
    });
  });

  it('should logout the user', () => {
    authService.clearCache();
    authService.getAuthUser().subscribe((user: User) => {
      expect(user).toBeNull();
      expect(authService.isAuthenticated).toBeFalsy();
    }, (error) => {
      console.log(error);
    });
  });*/
});

