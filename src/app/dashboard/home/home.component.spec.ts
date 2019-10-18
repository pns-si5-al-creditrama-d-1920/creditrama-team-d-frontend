import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

import {HomeComponent} from './home.component';
import {NavbarComponent} from 'app/shared/navbar/navbar.component';
import {FigurecardComponent} from 'app/shared/figurecard/figurecard.component';
import {ImagecardComponent} from 'app/shared/imagecard/imagecard.component';
import {MsgIconBtnComponent} from 'app/shared/msgiconbtn/msgiconbtn.component';
import {MatMenuModule} from '@angular/material/menu';
import {ObserversModule} from '@angular/cdk/observers';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>; // Test environment for the component
  let de: DebugElement; // Rendered HTML part of the component in its environment

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        // specific NgModule for this testing env (eg. where to add the tested components and services)
        declarations: [
          HomeComponent,
          NavbarComponent,
          FigurecardComponent,
          ImagecardComponent,
          MsgIconBtnComponent
        ],
        imports: [MatMenuModule, ObserversModule, MatInputModule, BrowserAnimationsModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    // Instantiate the context with the tested component
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have navbar titled Dashboard', () => {
    expect(de.query(By.css('app-navbar')).nativeElement.title).toBe('Dashboard');
  });
});
