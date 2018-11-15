import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { CreateComponent as EmployeeCreate } from './components/employee/create/create.component';
import { EmployeeListComponent } from './components/employee/list/list.component';
import { EditComponent as EditEmployeeComponent } from './components/employee/edit/edit.component';
import { ConfigComponent } from './components/config/config.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'config', component: ConfigComponent },

  { path: '', redirectTo: '/config', pathMatch: 'full'},

  { path: 'employee/list', component: EmployeeListComponent },
  { path: 'employee/edit/:id', component: EditEmployeeComponent },
  { path: 'employee/create', component: EmployeeCreate },

];

@NgModule({ 
  imports: [ RouterModule.forRoot(routes) ],

  exports: [ RouterModule ]  
})
export class AppRoutingModule {}