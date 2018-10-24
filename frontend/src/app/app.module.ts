import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskListComponent } from './components/task-list/task-list.component';
import { DetailComponent } from './components/employee/detail/detail.component';
import { EmployeeListComponent } from './components/employee/list/list.component';
import { EditComponent as EditEmployeeComponent } from './components/employee/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    EditComponent,
    ListComponent,
    TaskListComponent,
    DetailComponent,
    EmployeeListComponent,
    EditEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
