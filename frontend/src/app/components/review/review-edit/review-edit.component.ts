import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../../services/review/review.service';
import { Review } from '../../../models/review.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-review-edit',
  templateUrl: './review-edit.component.html',
  styleUrls: ['./review-edit.component.scss']
})
export class ReviewEditComponent implements OnInit {
  id: String;
  review: Review;

  private sub: any;
  constructor(public snackBar: MatSnackBar, private reviewService: ReviewService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number

      console.log('id: ' + this.id);
      // In a real app: dispatch action to load the details here.
      this.reviewService.getReviewById(this.id)
        .subscribe(rev => {
          this.review = rev;
          console.log(this.review);
        });
    });
  }

  updateReview() {
    console.log('updating review')
    console.log(this.review)
    this.reviewService.updateReview(this.review)
      .subscribe(res => {
        console.log(res);
        this.snackBar.open('Review updated', 'OK', {
          duration: 1000,
        });
      });
  }

}
