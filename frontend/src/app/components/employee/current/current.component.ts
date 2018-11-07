import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../models/app-state.model';

@Component({
  selector: 'app-current-employee',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {
  state: Observable<State>;
  constructor(private store: Store<State>) {
    this.state = store.select('state');
   }

  ngOnInit() {
  }

}
