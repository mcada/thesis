import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { HttpHeaders } from '@angular/common/http';
import { Employee } from '../../models/employee.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

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

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(this.config.backendUrl + 'employee/' + employee._id + '/update', employee, httpOptions);
  }

  createEmployee(employee: Employee): Observable<any> {
    return this.http.post(this.config.backendUrl + 'employee/add', employee, httpOptions);
  }

  deleteEmployee(employee_id: String) {
    return this.http.delete(this.config.backendUrl + 'employee/' + employee_id + '/delete');
  }

}
