import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { Config } from 'src/app/models/config.model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/models/app-state.model';
import * as StateActions from '../../store/state.actions'
import { Observable } from 'rxjs';
import { ReviewService } from 'src/app/services/review/review.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  configs: Config[]
  state: Observable<State>;

  constructor(private reviewService: ReviewService, private store: Store<State>, private configService: ConfigService) {
    this.configService.allConfigs$.subscribe(data => {
      console.log('found some config data: ')
      console.log(data)
      this.configs = data;
    })

    this.state = store.select('state');
  }

  ngOnInit() {

  }
  
  setConfig(config: Config) {
    this.store.dispatch(new StateActions.ChangeConfig(config))
    this.reviewService.loadReviews(config._id).subscribe(data => {
      this.store.dispatch(new StateActions.ChangeReviews(data))
    })
  }

}
