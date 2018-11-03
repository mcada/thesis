import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { Task } from '../../models/task.model';
import { MaterialModule } from '../../material.module';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  employeeId: String;
  private sub: any;

  task_date: Date;
  task_description: String;
  task_points: Number;
  task_managers_note: String;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['position', 'description', 'jira', 'date', 'bonus_points', 'action'];

  constructor(public snackBar: MatSnackBar, private taskService: TaskService, private route: ActivatedRoute) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.employeeId = params['id']; // (+) converts string 'id' to a number

      console.log('id: ' + this.employeeId);
      // In a real app: dispatch action to load the details here.
      this.taskService.getTasks(this.employeeId)
        .subscribe(tasks => this.dataSource.data = tasks);
    });


    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sort.sortChange.subscribe(() =>
      this.paginator.pageIndex = 0,
    );
  }


  updateTask(task: Task) {
    console.log(task);
    this.taskService.updateTask(task)
      .subscribe(returned => {
        this.snackBar.open('Task updated', 'OK', {
          duration: 1000,
        });
        console.log(returned)
      });
  }

  createTask() {
    var newTask = new Task();
    newTask.date=this.task_date;
    newTask.description=this.task_description;
    newTask.owner=this.employeeId;
    newTask.bonus_points=this.task_points;
    newTask.managers_note=this.task_managers_note;
    
    console.log(newTask)
  }
}
