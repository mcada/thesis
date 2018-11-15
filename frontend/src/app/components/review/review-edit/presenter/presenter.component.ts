import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Review } from '../../../../models/review.model';

@Component({
  selector: 'review-edit-presenter',
  templateUrl: './presenter.component.html',
  styleUrls: ['./presenter.component.scss']
})
export class PresenterComponent {

  @Input() review: Review;
  @Output() update = new EventEmitter<Review>();

  constructor() { }

  ngOnInit() {
  }

}
