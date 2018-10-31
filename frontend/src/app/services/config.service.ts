import { Injectable } from '@angular/core';
import { Config } from '../models/config.model';
import { CONFIGS } from '../models/mock-config';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  //TODO: get this URL from some file or environment variable
  public backendUrl = 'http://localhost:4000/';

  // Subscribe data
  private currentConfig = new BehaviorSubject(null);
  public currentConfig$ = this.currentConfig.asObservable();

  constructor(private http: HttpClient) {
    this.getConfig()
  }

  getConfig() {
    of({_id : '1',
    current_employee_id: '5bc07de6d2f53d92ff4f484b',
    date_from: new Date("2015/03/25"),
    date_to: new Date("2015/05/25")}).subscribe(data => {
        this.currentConfig.next(data); // <<== added
      // do something else
    }) 
  }

  setConfig(config: Config) {
    this.currentConfig.next(config)
  }

  getEmployeeById(id: String): Observable<any> {
    return this.http.get(this.backendUrl + 'employee/' + id);
  }

}
