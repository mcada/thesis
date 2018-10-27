import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  //TODO: get this URL from some file or environment variable
  public backendUrl = 'http://localhost:4000/';
  public employee: Employee;
  public dateFrom: Date;
  public dateTo: Date;


  constructor(private http: HttpClient) {
    this.getFirstEmployee()
      .subscribe(employee => this.employee = employee);
   }

  getFirstEmployee(): Observable<any> {
    return this.http.get(this.backendUrl + 'employee/' + '5bc07de6d2f53d92ff4f484b');
  }

  getEmployeeById(id: String): Observable<any> {
    return this.http.get(this.backendUrl + 'employee/' + id );
  }

}
