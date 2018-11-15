import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../../services/review/review.service';
import { Review } from '../../../models/review.model';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { State } from 'src/app/models/app-state.model';
import * as StateActions from '../../../store/state.actions'
import { Observable, Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-review-edit',
  templateUrl: './review-edit.component.html',
  styleUrls: ['./review-edit.component.scss']
})
export class ReviewEditComponent implements OnInit, OnDestroy {

  state: Observable<State>;
  private sub: Subscription;

  constructor(private store: Store<State>, public snackBar: MatSnackBar, private reviewService: ReviewService, private route: ActivatedRoute) {
    this.sub = new Subscription();
    this.state = store.select('state');
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  update(review: Review) {
    console.log('updating review')
    console.log(review)
    review.total_points = review.points_from_team_lead + review.total_points_from_tasks + review.points_from_manager

    this.sub.add(this.reviewService.updateReview(review)
      .subscribe(res => {
        console.log(res);
        this.snackBar.open('Review updated', 'OK', {
          duration: 1000,
        });
        this.store.dispatch(new StateActions.ChangeReview(review))
      }));
  }
}
