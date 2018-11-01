import { Injectable } from '@angular/core';
import { Config } from '../models/config.model';
import { CONFIGS } from '../models/mock-config';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
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

  constructor(private http: HttpClient) {
    this.getCurrentConfig()
    this.updateConfigs()
    
  }

  getCurrentConfig() {
    return of({_id : '1',
    current_employee_id: '5bc07de6d2f53d92ff4f484b',
    date_from: new Date("2015/03/25"),
    date_to: new Date("2015/05/25")}).subscribe(data => {
        this.currentConfig.next(data); // <<== added
      // do something else
    }) 
  }

  updateConfigs() {
    this.http.get(this.backendUrl + 'config').subscribe(data => {
      this.allConfigs.next(data)
    })
  }

  setCurrentConfig(config: Config) {
    console.log('setting another config: ' + config)
    this.currentConfig.next(config)
  }

  deleteConfig(config: Config) {
    return this.http.delete(this.backendUrl + 'config/' + config._id + '/delete');
  }

  createConfig(config: Config): Observable<any>  {
    return this.http.post(this.backendUrl + 'config/add', config, httpOptions);
  }

}
