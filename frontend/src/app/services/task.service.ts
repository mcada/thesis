import { Injectable } from '@angular/core';

import { Task } from '../models/task.model';
import { TASKS } from '../models/mock-tasks';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTasks(): Observable<Task[]> {
    return of(TASKS);
  }

}
