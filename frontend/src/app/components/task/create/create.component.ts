import { Component, OnInit, OnDestroy } from '@angular/core';
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
  selector: 'app-create-task',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

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

  createTask(newTask: Task) {

    this.sub.add(this.state.subscribe(curr => {
      //set current employee id
      newTask.owner = curr.employee._id;

      //create task
      this.sub.add(this.taskService.createTask(newTask)
        .subscribe(returned => {
          //inform user about task
          this.snackBar.open('Task created', 'OK', {
            duration: 2000,
          });

          //update current tasks - we dont know id of new task so we need database query :/
          this.sub.add(this.taskService.getTasks(curr.employee._id, curr.period.date_from, curr.period.date_to)
            .subscribe(tasks => {

              //push tasks to store
              this.store.dispatch(new StateActions.ChangeTasks(tasks))

              if (newTask.bonus_points > 0) {
                // update review if we add bonus points in current store, no need to push review to database
                // because createTask already handles it
                var rev: Review = curr.reviews.find(x => x.owner._id == curr.employee._id)
                rev.total_points_from_tasks = rev.total_points_from_tasks + newTask.bonus_points
                rev.total_points = rev.total_points + newTask.bonus_points

                this.store.dispatch(new StateActions.ChangeReview(rev))
              }
            }))
        }));
    }));
  }
}
