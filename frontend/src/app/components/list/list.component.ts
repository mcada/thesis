import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  employeeId: String;
  private sub: any;
  employee: Employee;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.employeeId = params['id']; // (+) converts string 'id' to a number

      console.log('id: ' + this.employeeId);
      // In a real app: dispatch action to load the details here.
      this.employeeService.getEmployeeById(this.employeeId)
        .subscribe(employee => {
          this.employee = employee;
          console.log(this.employee);
        });
    });
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
