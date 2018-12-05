import { Injectable } from '@angular/core';
import { Config } from '../models/config.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { environment } from './../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public backendUrl = environment.backendUrl;

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
