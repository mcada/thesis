import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from '../../../models/employee.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../models/app-state.model';
import { ReviewService } from 'src/app/services/review/review.service';
import * as StateActions from '../../../store/state.actions'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  id: String;
  employee: Employee;

  private sub: Subscription;

  state: Observable<State>;

  constructor(private reviewService: ReviewService, private store: Store<State>, public snackBar: MatSnackBar, private router: Router, private employeeService: EmployeeService, private route: ActivatedRoute) {
    this.sub = new Subscription();
    this.state = store.select('state');
  }

  ngOnInit() {
    this.sub.add(this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number

      console.log('id: ' + this.id);
      // In a real app: dispatch action to load the details here.
      this.sub.add(this.employeeService.getEmployeeById(this.id)
        .subscribe(employee => {
          this.employee = employee;
          console.log(this.employee);
          this.store.dispatch(new StateActions.ChangeEmployee(this.employee))
        }));
    }));
  }

  save(): void {
    console.log(this.employee);
    this.sub.add(this.employeeService.updateEmployee(this.employee)
      .subscribe((res) => {
        console.log(res);
        this.snackBar.open('Employee updated', 'OK', {
          duration: 3000,
        });
        this.store.dispatch(new StateActions.ChangeEmployee(this.employee))
        // Page redirect when getting response
        this.router.navigate(['/employee/list']);
      }, (error) => {
        console.log("err", error);
      }));
  }

  delete() {
    if (window.confirm('Are sure you want to delete this employee? All reviews and tasks will also be deleted.')) {
      this.sub.add(this.employeeService.deleteEmployee(this.employee._id)
        .subscribe((data) => {
          console.log(data);
          this.snackBar.open('Employee deleted', 'OK', {
            duration: 3000,
          });
          // Page redirect when getting response

          this.sub.add(this.state.subscribe(curr => {
            this.sub.add(this.reviewService.loadReviews(curr.period._id).subscribe(data => {
              this.store.dispatch(new StateActions.ChangeReviews(data))
              this.router.navigate(['/employee/list']);
            }))
          }))

        }, (error) => {
          console.log("err", error);
        }));
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
