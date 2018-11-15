import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'create-task-presenter',
  templateUrl: './presenter.component.html',
  styleUrls: ['./presenter.component.scss']
})
export class TaskPresenterComponent {
  task_date: Date;
  task_description: String;
  task_points: number = 0;
  task_managers_note: String = '';
  task_jira: String = '';

  @Output() create = new EventEmitter<Task>();

  constructor() { }

  ngOnInit() {
  }

  createTask() {
    let newTask = new Task();
    newTask.date = this.task_date;
    newTask.description = this.task_description;
    newTask.bonus_points = this.task_points;
    newTask.managers_note = this.task_managers_note;
    newTask.jira_link = this.task_jira;

    this.create.emit(newTask);

    this.task_date = undefined;
    this.task_description = '';
    this.task_points = 0;
    this.task_managers_note = '';
    this.task_jira = '';
  }
}
