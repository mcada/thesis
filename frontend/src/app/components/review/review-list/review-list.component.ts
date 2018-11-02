import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/services/review/review.service';
import {Review} from '../../../models/review.model';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {
  reviews: Review[]

  constructor(private configService: ConfigService) {
    configService.reviews$.subscribe(data => {
      this.reviews = data;
    })
   }

  ngOnInit() {

  }

}
