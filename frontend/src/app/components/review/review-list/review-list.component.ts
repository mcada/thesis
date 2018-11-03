import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/services/review/review.service';
import { Review } from '../../../models/review.model';
import { ConfigService } from 'src/app/services/config.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {
  reviews: Review[]
  employees: Employee[]

  constructor(private configService: ConfigService, private employeeService: EmployeeService) {
    configService.reviews$.subscribe(data => {
      this.reviews = data;
    })
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees);
  }

  ngOnInit() {

  }

  getEmployeeName(id: String): String {
    console.log('looking for emp with id: ' + id)
    var emp = this.employees.find(x => x._id == id)
    return emp.last_name + ' ' + emp.first_name
  }

}