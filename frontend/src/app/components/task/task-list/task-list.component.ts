import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { Task } from '../../../models/task.model';
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
  tasks: Task[];

  task_date: Date;
  task_description: String;
  task_points: Number;
  task_managers_note: String;


  constructor(public snackBar: MatSnackBar, private taskService: TaskService, private route: ActivatedRoute) { }

 

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.employeeId = params['id']; // (+) converts string 'id' to a number

      console.log('id: ' + this.employeeId);
      // In a real app: dispatch action to load the details here.
      this.taskService.getTasks(this.employeeId)
        .subscribe(tasks => {
          this.tasks = tasks;
        })
    });
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



  deleteTask(task_id: String) {
    if (window.confirm('Are sure you want to delete this task?')) {

      console.log(task_id);
      this.taskService.deleteTask(task_id)
        .subscribe(returned => {
          this.snackBar.open('Task deleted', 'OK', {
            duration: 1000,
          });
          console.log(returned)
          //TODO: better would be to filter table datasource for the task and remove it so there 
          //      will be no need for another http call
          this.taskService.getTasks(this.employeeId)
            .subscribe(tasks => this.tasks = tasks);
        });
    }
  }
}
