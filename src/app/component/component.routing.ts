import { Routes } from '@angular/router';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';

import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { BadgeComponent } from './badge/badge.component';
import { NgbdButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { ListAllRoleComponent } from './list-all-role/list-all-role.component';
import { ListAllApplicationComponent } from './list-all-app/list-all-app.component';
import { ListAllDivisionComponent } from './list-all-division/list-all-division.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddDataComponent } from './add-data/add-data.component';
import { UserComponent } from './user/user.component';
import { AccessGroupComponent } from './access-group/access-group.component';
import { ApplicationComponent } from './application/application.component';
import { DivisionComponent } from './division/division.component';
import { MasterDocComponent } from './master-doc/master-doc.component';
import { FormDaComponent } from './form-da/form-da.component';
import { FormItcmComponent } from './form-itcm/form-itcm.component';




export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'table',
				component: TableComponent
			},
			{
				path: 'card',
				component: CardsComponent
			},
			{
				path: 'pagination',
				component: NgbdpaginationBasicComponent
			},
			{
				path: 'badges',
				component: BadgeComponent
			},
			{
				path: 'alert',
				component: NgbdAlertBasicComponent
			},
			{
				path: 'dropdown',
				component: NgbdDropdownBasicComponent
			},
			{
				path: 'nav',
				component: NgbdnavBasicComponent
			},
			{
				path: 'buttons',
				component: NgbdButtonsComponent
			},
			{
				path: 'list-all-role',
				component: ListAllRoleComponent
			},
			{
				path: 'list-all-division',
				component: ListAllDivisionComponent
			},
			{
				path: 'list-all-app',
				component: ListAllApplicationComponent
			},
			{
				path: 'add-user',
				component: AddUserComponent
			},
			{
				path: 'add-data',
				component: AddDataComponent,
			},
			{
				path: 'user-control',
				component: UserComponent
			},
			{
				path: 'grup-akses',
				component: AccessGroupComponent
			},
			{
				path: 'application',
				component: ApplicationComponent
			},
			{
				path: 'division',
				component: DivisionComponent
			},
			{
				path: 'doc-settings',
				component: MasterDocComponent
			},
			{
				path: 'form-da',
				component: FormDaComponent
			},
			{
				path: 'form-itcm',
				component: FormItcmComponent
			}
		]
	}
];
