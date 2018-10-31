import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { CreateComponent as EmployeeCreate } from './components/employee/create/create.component';
import { EmployeeListComponent } from './components/employee/list/list.component';
import { EditComponent as EditEmployeeComponent } from './components/employee/edit/edit.component';

const routes: Routes = [
  { path: 'edit/:id', component: EditComponent },
  { path: 'list', component: ListComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full'},

  { path: 'employee/list', component: EmployeeListComponent },
  { path: 'employee/edit/:id', component: EditEmployeeComponent },
  { path: 'employee/create', component: EmployeeCreate },

];

@NgModule({ 
  imports: [ RouterModule.forRoot(routes) ],

  exports: [ RouterModule ]  
})
export class AppRoutingModule {}