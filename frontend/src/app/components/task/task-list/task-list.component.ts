import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { Task } from '../../../models/task.model';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../models/app-state.model';
import * as StateActions from '../../../store/state.actions'
import { Review } from 'src/app/models/review.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  private sub: Subscription;

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
    if (task.new_points == undefined) {
      task.new_points = 0
    }
    this.sub.add(this.taskService.updateTask(task, task.new_points)
      .subscribe(returned => {
        this.snackBar.open('Task updated', 'OK', {
          duration: 1000,
        });
        console.log(returned)
        var diff = task.new_points - task.bonus_points
        task.bonus_points = task.new_points
        this.store.dispatch(new StateActions.UpdateTask(task))

        if (diff != 0) {
          this.sub.add(this.state.subscribe(curr => {
            var rev: Review = curr.reviews.find(x => x.owner._id == curr.employee._id)
            rev.total_points_from_tasks = rev.total_points_from_tasks + diff
            rev.total_points = rev.total_points_from_tasks + rev.points_from_team_lead

            this.store.dispatch(new StateActions.ChangeReview(rev))
          }))
        }
      }));
  }

  deleteTask(task: Task) {
    if (window.confirm('Are sure you want to delete this task?')) {

      console.log(task._id);
      this.sub.add(this.taskService.deleteTask(task._id)
        .subscribe(returned => {
          this.snackBar.open('Task deleted', 'OK', {
            duration: 1000,
          });
          console.log(returned)

          this.store.dispatch(new StateActions.RemoveTask(task._id))

          this.sub.add(this.state.subscribe(curr => {
            var rev: Review = curr.reviews.find(x => x.owner._id == curr.employee._id)
            rev.total_points_from_tasks = rev.total_points_from_tasks - task.bonus_points
            rev.total_points = rev.total_points_from_tasks + rev.points_from_team_lead

            this.store.dispatch(new StateActions.ChangeReview(rev))
          }))

        }));
    }
  }
}
