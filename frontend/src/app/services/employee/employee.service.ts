import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  getEmployees(): Observable<any> {
    return this.http.get(this.config.backendUrl + 'employee');
  }

  getEmployeeById(id: String): Observable<any> {
    return this.http.get(this.config.backendUrl + 'employee/' + id );
  }

}
