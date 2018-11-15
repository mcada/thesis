import { Injectable } from '@angular/core';
import { Config } from '../models/config.model';
import { CONFIGS } from '../models/mock-config';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { ReviewService } from './review/review.service';
import { MatSnackBar } from '@angular/material';

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

  constructor(public snackBar: MatSnackBar, private http: HttpClient) {
  }

  getConfigs(): Observable<any> {
    return this.http.get(this.backendUrl + 'config')
  }

  deleteConfig(config: Config) {
    return this.http.delete(this.backendUrl + 'config/' + config._id + '/delete');
  }

  createConfig(config: Config): Observable<any> {
    return this.http.post(this.backendUrl + 'config/add', config, httpOptions);
  }

  updateFromJira(): Observable<any> {
    return this.http.get(this.backendUrl + 'config/updatefromjira')
  }

  lastJiraUpdate(): Observable<any> {
    return this.http.get(this.backendUrl + 'config/settings')
  }

}
