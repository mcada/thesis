import { Injectable } from '@angular/core';
import { Config } from '../models/config.model';
import { CONFIGS } from '../models/mock-config';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { ReviewService } from './review/review.service';
import {MatSnackBar} from '@angular/material';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  //TODO: get this URL from some file or environment variable
  public backendUrl = 'http://localhost:4000/';

  // Subscribe data
  private currentConfig = new BehaviorSubject(null);
  public currentConfig$ = this.currentConfig.asObservable();

  // Subscribe data
  private allConfigs = new BehaviorSubject(null);
  public allConfigs$ = this.allConfigs.asObservable();

  // Subscribe data
  private reviews = new BehaviorSubject(null);
  public reviews$ = this.reviews.asObservable();

  constructor(public snackBar: MatSnackBar, private http: HttpClient) {
    this.initializeConfig()
    this.updateConfigs()

  }

  initializeConfig() {
    //TODO: find out how to initialize current config and distribute it 
    //      to all subjects (google ReplaySubject?)
    return of({
      _id: '5bdb8f6b068b4f3a085743fb',
      date_from: new Date("2015/03/25"),
      date_to: new Date("2019/05/25")
    }).subscribe(data => {
      this.currentConfig.next(data); // <<== added
      // do something else
    })
  }

  updateConfigs() {
    this.http.get(this.backendUrl + 'config').subscribe(data => {
      this.allConfigs.next(data)
      //this.currentConfig.next(data[0])
    })
  }

  setCurrentConfig(config: Config) {
    console.log('setting another config: ' + config)
    this.snackBar.open('Current period changed', 'OK', {
      duration: 3000,
    });
    this.currentConfig.next(config)
    this.updateReviews(config._id)
  }

  updateReviews(configId: String) {
    this.http.get(this.backendUrl + 'review/' + configId)
      .subscribe(data => {
        this.reviews.next(data)
      })
  }

  deleteConfig(config: Config) {
    return this.http.delete(this.backendUrl + 'config/' + config._id + '/delete');
  }

  createConfig(config: Config): Observable<any> {
    return this.http.post(this.backendUrl + 'config/add', config, httpOptions);
  }

}
