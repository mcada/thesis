import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'employee-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  dataSource: Employee[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployees()
      .subscribe(employees => this.dataSource = employees);
  }
}
