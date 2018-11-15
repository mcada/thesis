import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { Config } from 'src/app/models/config.model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/models/app-state.model';
import * as StateActions from '../../store/state.actions'
import { Observable, Subscription } from 'rxjs';
import { ReviewService } from 'src/app/services/review/review.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  state: Observable<State>;
  private sub: Subscription;

  constructor(private taskService: TaskService, private reviewService: ReviewService, private store: Store<State>, private configService: ConfigService) {
    this.sub = new Subscription();
    this.state = store.select('state');

    this.sub.add(this.state.subscribe(curr => {
      this.sub.add(configService.getConfigs().subscribe(data => {
        this.store.dispatch(new StateActions.ChangeConfigs(data))
      }))
    }))
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  setConfig(config: Config) {
    //update current period
    this.store.dispatch(new StateActions.ChangeConfig(config))

    //update review list
    this.sub.add(this.reviewService.loadReviews(config._id)
      .subscribe(data => {
        this.store.dispatch(new StateActions.ChangeReviews(data))
      }))

    this.sub.add(this.state.subscribe(curr => {
      //update task list
      this.sub.add(this.taskService.getTasks(curr.employee._id, curr.period.date_from, curr.period.date_to)
        .subscribe(tasks => {
          this.store.dispatch(new StateActions.ChangeTasks(tasks))
        }))
      //update current review
      this.sub.add(this.reviewService.getReviewById(curr.employee._id, curr.period._id)
        .subscribe((review) => {
          this.store.dispatch(new StateActions.ChangeReview(review))
        }))
    }));
  }
}
