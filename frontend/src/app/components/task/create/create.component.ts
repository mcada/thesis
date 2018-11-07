import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { Task } from '../../../models/task.model';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../models/app-state.model';
import * as StateActions from '../../../store/state.actions'

@Component({
  selector: 'app-create-task',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  employeeId: String;
  private sub: any;
  state: Observable<State>;


  //I bet I should work with names from form input and reset the form with some
  //special method coz this is stupid doing it via ngModel
  task_date: Date;
  task_description: String;
  task_points: Number;
  task_managers_note: String;
  task_jira: String;

  constructor(private store: Store<State>, public snackBar: MatSnackBar, private taskService: TaskService, private route: ActivatedRoute) {
    this.state = store.select('state');
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.employeeId = params['id']; // (+) converts string 'id' to a number

    });
  }

  createTask() {
    var newTask = new Task();
    newTask.date = this.task_date;
    newTask.description = this.task_description;
    newTask.owner = this.employeeId;
    newTask.bonus_points = this.task_points;
    newTask.managers_note = this.task_managers_note;
    newTask.jira_link = this.task_jira;

    this.taskService.createTask(newTask)
      .subscribe(returned => {
        this.snackBar.open('Task created', 'OK', {
          duration: 2000,
        });
        this.state.subscribe(curr => {
          this.taskService.getTasks(curr.employee._id, curr.period.date_from, curr.period.date_to)
            .subscribe(tasks => {
              this.store.dispatch(new StateActions.ChangeTasks(tasks))
            })
        });
      });

    this.task_date = undefined;
    this.task_description = undefined;
    this.task_points = undefined;
    this.task_managers_note = undefined;
    this.task_jira = undefined;


    
  }

}
