import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from '../../../models/employee.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  id: String;
  employee: Employee;

  private sub: any;

  constructor(public snackBar: MatSnackBar, private router: Router, private employeeService: EmployeeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number

      console.log('id: ' + this.id);
      // In a real app: dispatch action to load the details here.
      this.employeeService.getEmployeeById(this.id)
        .subscribe(employee => {
          this.employee = employee;
          console.log(this.employee);
        });
    });
  }

  save(): void {
    console.log(this.employee);
    this.employeeService.updateEmployee(this.employee)
      .subscribe((data) => {
        console.log(data);
        this.snackBar.open('Employee updated', 'OK', {
          duration: 3000,
        });
        // Page redirect when getting response
        this.router.navigate(['/employee/list']);
      }, (error) => {
        console.log("err", error);
      });
  }

  delete() {
    if (window.confirm('Are sure you want to delete this employee? All reviews and tasks will also be deleted.')) {
      this.employeeService.deleteEmployee(this.employee._id)
        .subscribe((data) => {
          console.log(data);
          this.snackBar.open('Employee deleted', 'OK', {
            duration: 3000,
          });
          // Page redirect when getting response
          this.router.navigate(['/employee/list']);
        }, (error) => {
          console.log("err", error);
        });
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
