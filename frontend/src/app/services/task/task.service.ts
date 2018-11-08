import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { Task } from '../../models/task.model';
import { HttpHeaders } from '@angular/common/http';
import { Config } from 'src/app/models/config.model';
import { Store } from '@ngrx/store';
import { State } from '../../models/app-state.model';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  state: Observable<State>;

  constructor(private store: Store<State>, private http: HttpClient, private config: ConfigService) {
    this.state = store.select('state');
  }

  getTasks(owner: String, from: Date, to: Date): Observable<any> {
    return this.http.get(this.config.backendUrl + 'task/' + owner + '/' + from + '/' + to);
  }

  updateTask(task: Task, points: Number): Observable<any> {
    return this.http.put(this.config.backendUrl + 'task/' + task._id + '/update/' + points, task, httpOptions);
  }

  createTask(task: Task): Observable<any> {
    return this.http.post(this.config.backendUrl + 'task/add', task, httpOptions);
  }

  deleteTask(task_id: String) {
    return this.http.delete(this.config.backendUrl + 'task/' + task_id + '/delete');
  }
}
