import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { Task } from '../../../models/task.model';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../models/app-state.model';
import * as StateActions from '../../../store/state.actions'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  tasks: Task[];

  task_date: Date;
  task_description: String;
  task_points: Number;
  task_managers_note: String;

  state: Observable<State>;

  constructor(private store: Store<State>, public snackBar: MatSnackBar, private taskService: TaskService, private route: ActivatedRoute) {
    this.sub = new Subscription();
    this.state = store.select('state');
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  updateTask(task: Task) {
    console.log(task);
    this.sub.add(this.taskService.updateTask(task)
      .subscribe(returned => {
        this.snackBar.open('Task updated', 'OK', {
          duration: 1000,
        });
        console.log(returned)
      }));
  }

  deleteTask(task_id: String) {
    if (window.confirm('Are sure you want to delete this task?')) {

      console.log(task_id);
      this.sub.add(this.taskService.deleteTask(task_id)
        .subscribe(returned => {
          this.snackBar.open('Task deleted', 'OK', {
            duration: 1000,
          });
          console.log(returned)

          this.store.dispatch(new StateActions.RemoveTask(task_id))
        }));
    }
  }
}
