import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {routing} from './app.routes';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';

import {AppComponent} from './app.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HomeComponent} from './dashboard/home/home.component';
import {ProfileComponent} from './dashboard/profile/profile.component';
import 'hammerjs';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {FigurecardComponent} from './shared/figurecard/figurecard.component';
import {ImagecardComponent} from './shared/imagecard/imagecard.component';
import {TableComponent} from './dashboard/table/table.component';
import {NotificationComponent} from './dashboard/notification/notification.component';
import {MsgIconBtnComponent} from './shared/msgiconbtn/msgiconbtn.component';
import {SweetAlertComponent} from './dashboard/sweetalert/sweetalert.component';
import {LoginComponent} from './page/login/login.component';
import {RootComponent} from './dashboard/root/root.component';
import {RegisterComponent} from './page/register/register.component';
import {LockComponent} from './page/lock/lock.component';
import {HeaderComponent} from './shared/header/header.component';
import {FooterComponent} from './shared/footer/footer.component';
import {SettingsComponent} from './dashboard/settings/settings.component';
import {PriceTableComponent} from './dashboard/component/pricetable/pricetable.component';
import {PanelsComponent} from './dashboard/component/panels/panels.component';

import { SettingsService } from './services/settings.service';
import { WizardComponent } from './dashboard/component/wizard/wizard.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BankService } from './services/bank.service';
import {OAuthModule} from 'angular-oauth2-oidc';
import {TokenInterceptor} from './interceptors/token.interceptor';
import { RecipientsComponent } from './dashboard/recipients/recipients.component';
import { TransferComponent } from './dashboard/transfer/transfer.component';

@NgModule({
  declarations: [
	AppComponent,
	SidebarComponent,
	HomeComponent,
	ProfileComponent,
	NavbarComponent,
	FigurecardComponent,
	ImagecardComponent,
	TableComponent,
	NotificationComponent,
	MsgIconBtnComponent,
	SweetAlertComponent,
	LoginComponent,
	RootComponent,
	RegisterComponent,
	LockComponent,
	HeaderComponent,
	FooterComponent,
	SettingsComponent,
	PriceTableComponent,
	PanelsComponent,
	WizardComponent,
	RecipientsComponent,
	TransferComponent
  ],
  imports: [
	BrowserModule,
	FormsModule,
	HttpClientModule,
	routing,
	BrowserAnimationsModule,
	MatButtonModule,
	MatRadioModule,
	OAuthModule.forRoot(),
	MatInputModule,
	MatMenuModule,
	MatCheckboxModule
  ],
  providers: [SettingsService, {
	provide: HTTP_INTERCEPTORS,
	useClass: TokenInterceptor,
	multi: true
  }, BankService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
