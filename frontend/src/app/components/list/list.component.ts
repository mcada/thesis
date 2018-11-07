import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  employeeId: String;
  private sub: Subscription;
  employee: Employee;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) {
    this.sub = new Subscription();    
   }

  ngOnInit() {
    this.sub.add(this.route.params.subscribe(params => {
      this.employeeId = params['id']; // (+) converts string 'id' to a number

      console.log('id: ' + this.employeeId);
      // In a real app: dispatch action to load the details here.
      this.sub.add(this.employeeService.getEmployeeById(this.employeeId)
        .subscribe(employee => {
          this.employee = employee;
          console.log(this.employee);
        }));
    }));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
