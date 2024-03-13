import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';
import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { NgbdButtonsComponent } from './buttons/buttons.component';
import { TableComponent } from "./table/table.component";
import { AddUserComponent } from './add-user/add-user.component';
import { UserComponent } from './user/user.component';
import { AccessGroupComponent } from './access-group/access-group.component';
import { ApplicationComponent } from './application/application.component';
import { DivisionComponent } from './division/division.component';
import { MasterDocComponent } from './master-doc/master-doc.component';
import { FormDaComponent } from './form-da/form-da.component';
import { FormItcmComponent } from './form-itcm/form-itcm.component';
import { AppRoleComponent } from './app-role/app-role.component';
import { FormListComponent } from './form-list/form-list.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbdpaginationBasicComponent,
    NgbdAlertBasicComponent,
    NgbdDropdownBasicComponent,
    NgbdnavBasicComponent,
    NgbdButtonsComponent,
    TableComponent
  ],
  declarations: [
       AddUserComponent,
       UserComponent,
       AccessGroupComponent,
       ApplicationComponent,
       DivisionComponent,
       MasterDocComponent,
       FormDaComponent,
       FormItcmComponent,
       AppRoleComponent,
       FormListComponent,
  ],
})
export class ComponentsModule { }
