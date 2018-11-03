import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { Task } from '../../models/task.model';
import { HttpHeaders } from '@angular/common/http';
import { TASKS } from '../../models/mock-tasks';
import { Config } from 'src/app/models/config.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  currentConfig: Config;



  constructor(private http: HttpClient, private config: ConfigService) {
    config.currentConfig$.subscribe(data => {
      this.currentConfig = data;
    })
  }

  getTasks(owner: String): Observable<any> {
    console.log('here')
    return this.http.get(this.config.backendUrl + 'task/' + owner + '/' + this.currentConfig.date_from + '/' + this.currentConfig.date_to);
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put(this.config.backendUrl + 'task/' + task._id + '/update', task, httpOptions);
  }

  createTask(task: Task): Observable<any> {
    return this.http.post(this.config.backendUrl + 'task/add', task, httpOptions);
  }

  deleteTask(task_id: String) {
    return this.http.delete(this.config.backendUrl + 'task/' + task_id + '/delete');
  }
}
