import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskListComponent } from './components/task/task-list/task-list.component';
import { CreateComponent as CreateTaskComponent } from './components/task/create/create.component';
import { EmployeeListComponent } from './components/employee/list/list.component';
import { CreateComponent } from './components/employee/create/create.component';
import { EditComponent as EditEmployeeComponent } from './components/employee/edit/edit.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ConfigComponent } from './components/config/config.component';
import { ReviewListComponent } from './components/review/review-list/review-list.component';
import { ReviewEditComponent } from './components/review/review-edit/review-edit.component';

//store
import { StoreModule } from '@ngrx/store';
import { stateReducer } from './store/state.reducer';
import { CurrentComponent } from './components/employee/current/current.component';
import { PresenterComponent } from './components/review/review-edit/presenter/presenter.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ListComponent,
    TaskListComponent,
    EmployeeListComponent,
    EditEmployeeComponent,
    ToolbarComponent,
    ConfigComponent,
    ReviewListComponent,
    ReviewEditComponent,
    CreateTaskComponent,
    CurrentComponent,
    PresenterComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      state: stateReducer
    }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
