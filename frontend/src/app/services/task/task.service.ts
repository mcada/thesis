import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  getTasks(): Observable<any> {
    return this.http.get(this.config.backendUrl + 'task');
  }

}
