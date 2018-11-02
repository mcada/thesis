import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from '../../../models/employee.model';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  employee: Employee;


  constructor(public snackBar: MatSnackBar, private router: Router, private employeeService: EmployeeService) {
    this.employee = new Employee();
  }

  ngOnInit() {
  }


  save(): void {
    console.log(this.employee);
    this.employeeService.createEmployee(this.employee)
      .subscribe((data) => {
        console.log(data);
        this.snackBar.open('Employee created', 'OK', {
          duration: 3000,
        });
        // Page redirect when getting response
        this.router.navigate(['/employee/list']);
      }, (error) => {
        console.log("err", error);
      });
  }

}
