import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from '../../../models/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  employee: Employee;


  constructor(private router: Router, private employeeService: EmployeeService) {
    this.employee = new Employee();
  }

  ngOnInit() {
  }


  save(): void {
    console.log(this.employee);
    this.employeeService.createEmployee(this.employee)
      .subscribe((data) => {
        console.log(data);
        // Page redirect when getting response
        this.router.navigate(['/employee/list']);
      }, (error) => {
        console.log("err", error);
      });
  }

}
