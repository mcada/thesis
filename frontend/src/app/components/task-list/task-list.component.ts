import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { Task } from '../../models/task.model';
import { MaterialModule } from '../../material.module';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input() taskId: String;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['position', 'description', 'jira', 'date', 'bonus_points', 'action'];

  constructor(public snackBar: MatSnackBar, private taskService: TaskService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.taskService.getTasks()
      .subscribe(tasks => this.dataSource.data = tasks);
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
}
