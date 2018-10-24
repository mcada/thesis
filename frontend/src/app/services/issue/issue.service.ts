import { Injectable } from '@angular/core';

import { Issue } from '../../models/Issue';
import { ISSUES } from '../../models/mock-issues';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor() { }

  getIssues(): Observable<Issue[]> {
    return of(ISSUES);
  }
}
