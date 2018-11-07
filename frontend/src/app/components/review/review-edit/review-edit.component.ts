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
  id: String;
  review: Review;
  state: Observable<State>;

  private sub: Subscription;
  constructor(private store: Store<State>, public snackBar: MatSnackBar, private reviewService: ReviewService, private route: ActivatedRoute) {
    this.sub = new Subscription();
    this.state = store.select('state');
  }

  ngOnInit() {
    this.sub.add(this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number

      console.log('id: ' + this.id);
      // In a real app: dispatch action to load the details here.
      this.sub.add(this.state.subscribe(curr => {
        this.sub.add(this.reviewService.getReviewById(this.id, curr.period._id)
          .subscribe(rev => {
            this.review = rev;
            console.log(this.review);
          }));
      }))
    }));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  updateReview() {
    console.log('updating review')
    console.log(this.review)
    this.sub.add(this.reviewService.updateReview(this.review)
      .subscribe(res => {
        console.log(res);
        this.snackBar.open('Review updated', 'OK', {
          duration: 1000,
        });
      }));
  }

}
