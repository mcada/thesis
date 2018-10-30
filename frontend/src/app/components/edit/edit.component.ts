import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  startDate = new Date(1990, 1, 1);

  constructor() { }

  ngOnInit() {
  }

}
