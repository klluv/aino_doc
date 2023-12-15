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
import { CardsComponent } from './card/card.component';
import { TableComponent } from "./table/table.component";
import { ListAllRoleComponent } from './list-all-role/list-all-role.component';
import { ListAllDivisionComponent } from './list-all-division/list-all-division.component';
import { ListAllApplicationComponent } from './list-all-app/list-all-app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddDataComponent } from './add-data/add-data.component';
import { EditDivisionComponent } from './list-all-division/edit-division/edit-division.component';
import { EditRoleComponent } from './list-all-role/edit-role/edit-role.component';
import { UserComponent } from './user/user.component';
import { AccessGroupComponent } from './access-group/access-group.component';
import { ApplicationComponent } from './application/application.component';

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
    CardsComponent,
    TableComponent
  ],
  declarations: [
      ListAllRoleComponent,
       ListAllDivisionComponent,
       ListAllApplicationComponent,
       AddUserComponent,
       AddDataComponent,
       EditDivisionComponent,
       EditRoleComponent,
       UserComponent,
       AccessGroupComponent,
       ApplicationComponent,
  ],
})
export class ComponentsModule { }
