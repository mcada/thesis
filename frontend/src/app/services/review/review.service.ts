import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { Review } from '../../models/review.model';
import { Config } from '../../models/config.model';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  currentConfig: Config;



  constructor(private http: HttpClient, private config: ConfigService) {
    config.currentConfig$.subscribe(data => {
      this.currentConfig = data;
      this.config.updateReviews(this.currentConfig._id)
    })
  }

  getReviewById(id: String): Observable<any> {
    return this.http.get(this.config.backendUrl + 'review/' + id + '/' + this.currentConfig._id );
  }  

  updateReview(review: Review): Observable<any> {
    return this.http.put(this.config.backendUrl + 'review/' + review._id + '/update', review, httpOptions);
  }
}
