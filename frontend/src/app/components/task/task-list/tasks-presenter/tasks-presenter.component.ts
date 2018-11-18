import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task.model';
@Component({
  selector: 'app-tasks-presenter',
  templateUrl: './tasks-presenter.component.html',
  styleUrls: ['./tasks-presenter.component.scss']
})
export class TasksPresenterComponent {

  @Input() tasks: Task[];
  @Output() update = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();

  constructor() { }

  ngOnInit() {
  }

}
