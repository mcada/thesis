import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { Task } from '../../models/task.model';
import { HttpHeaders } from '@angular/common/http';
import { TASKS } from '../../models/mock-tasks';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  

  constructor(private http: HttpClient, private config: ConfigService) { }

  getTasks(): Observable<any> {
    return this.http.get(this.config.backendUrl + 'task');
    //return of(TASKS);
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put(this.config.backendUrl + 'task/' + task._id + '/update', task, httpOptions);
  }

}
