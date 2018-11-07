import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from '../../../models/employee.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'employee-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  dataSource: Employee[] = [];
  private sub: Subscription;

  constructor(private employeeService: EmployeeService) {
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.sub.add(this.employeeService.getEmployees()
      .subscribe(employees => this.dataSource = employees));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
