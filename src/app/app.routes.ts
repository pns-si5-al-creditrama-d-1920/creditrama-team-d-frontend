/**
 * Created by wangdi on 26/5/17.
 */
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './dashboard/home/home.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { TableComponent } from './dashboard/table/table.component';
import { NotificationComponent } from './dashboard/notification/notification.component';
import { SweetAlertComponent } from './dashboard/sweetalert/sweetalert.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { PriceTableComponent } from './dashboard/component/pricetable/pricetable.component';
import { PanelsComponent } from './dashboard/component/panels/panels.component';
import { WizardComponent } from './dashboard/component/wizard/wizard.component';

import { RootComponent } from './dashboard/root/root.component';
import { LoginComponent } from './page/login/login.component';
import { LockComponent } from './page/lock/lock.component';
import { RegisterComponent } from './page/register/register.component';
import { AuthGuardService } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { UserInfoResolver } from './resolvers/userinfo.resolver';
import { RecipientsComponent } from './dashboard/recipients/recipients.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full'
	},
	{ path: 'login', component: LoginComponent, canActivate: [ LoginGuard ] },
	{ path: 'lock', component: LockComponent },
	{ path: 'register', component: RegisterComponent },
	{
		path: 'dashboard',
		component: RootComponent,
		resolve: {
			user: UserInfoResolver // on associe un resolver à la route
		},
		children: [
			{
				path: '',
				component: HomeComponent,
				canActivate: [ AuthGuardService ]
			},
			{ path: 'profile', component: ProfileComponent },
			{ path: 'table', component: TableComponent },
			{ path: 'notification', component: NotificationComponent },
			{ path: 'alert', component: SweetAlertComponent },
			{ path: 'settings', component: SettingsComponent },
			{ path: 'components/price-table', component: PriceTableComponent },
			{ path: 'components/panels', component: PanelsComponent },
			{ path: 'components/wizard', component: WizardComponent },
			{ path: 'recipients', component: RecipientsComponent }
		]
	}
];

export const routing = RouterModule.forRoot(routes);
