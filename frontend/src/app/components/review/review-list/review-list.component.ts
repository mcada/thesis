import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/services/review/review.service';
import { Review } from '../../../models/review.model';
import { ConfigService } from 'src/app/services/config.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/models/app-state.model';
import * as StateActions from '../../../store/state.actions'
import { Observable } from 'rxjs';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {
  state: Observable<State>;

  constructor(private taskService: TaskService, reviewService: ReviewService, private store: Store<State>, private configService: ConfigService, private employeeService: EmployeeService) {
    this.state = store.select('state');

    this.state.subscribe(curr => {
      reviewService.loadReviews(curr.period._id).subscribe(data => {
        this.store.dispatch(new StateActions.ChangeReviews(data))
      })
    })
  }

  ngOnInit() {
  }

  changeCurrentEmployee(id: String) {
    this.employeeService.getEmployeeById(id).subscribe(emp => {
      this.store.dispatch(new StateActions.ChangeEmployee(emp))

      this.state.subscribe(curr => {
        this.taskService.getTasks(curr.employee._id, curr.period.date_from, curr.period.date_to)
          .subscribe(tasks => {
            this.store.dispatch(new StateActions.ChangeTasks(tasks))
          })
      });
    })
  }

}
