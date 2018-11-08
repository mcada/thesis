import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from '../../../models/employee.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../models/app-state.model';
import * as StateActions from '../../../store/state.actions'
import { ReviewService } from 'src/app/services/review/review.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  employee: Employee;

  state: Observable<State>;
  private sub: Subscription;

  constructor(private reviewService: ReviewService, private store: Store<State>, public snackBar: MatSnackBar, private router: Router, private employeeService: EmployeeService) {
    this.sub = new Subscription();
    this.employee = new Employee();
    this.state = store.select('state');
  }

  ngOnInit() {
  }

  save(): void {
    console.log(this.employee);
    this.sub.add(this.employeeService.createEmployee(this.employee)
      .subscribe((data) => {
        console.log(data);
        this.snackBar.open('Employee created', 'OK', {
          duration: 3000,
        });

        this.sub.add(this.state.subscribe(curr => {
          this.sub.add(this.reviewService.loadReviews(curr.period._id).subscribe(data => {
            this.store.dispatch(new StateActions.ChangeReviews(data))
            // Page redirect when getting response
            this.router.navigate(['/employee/list']);
          }))
        }))


      }, (error) => {
        console.log("err", error);
      }));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
