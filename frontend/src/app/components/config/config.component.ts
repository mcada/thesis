import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { Config } from 'src/app/models/config.model';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../models/app-state.model';
import * as StateActions from '../../store/state.actions'
import { ReviewService } from 'src/app/services/review/review.service';
import { TaskService } from 'src/app/services/task/task.service';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit, OnDestroy {
  newFrom: Date;
  newTo: Date;

  displayedColumns: string[] = ['from', 'to', 'action'];

  state: Observable<State>;
  private sub: Subscription;

  constructor(private reviewService: ReviewService, private store: Store<State>, private configService: ConfigService) {
    this.sub = new Subscription();
    this.state = store.select('state');
  }

  ngOnInit() {

  }

  setConfig(config: Config) {
    this.store.dispatch(new StateActions.ChangeConfig(config))
    this.sub.add(this.reviewService.loadReviews(config._id).subscribe(data => {
      this.store.dispatch(new StateActions.ChangeReviews(data))
    }))
  }

  deleteConfig(config: Config) {
    if (window.confirm('Are sure you want to delete this period? All reviews will be deleted with it.')) {
      this.sub.add(this.configService.deleteConfig(config)
        .subscribe((data) => {
          console.log(data);
          this.sub.add(this.configService.getConfigs()
            .subscribe(configs => {
              this.store.dispatch(new StateActions.ChangeConfigs(configs))
            }))
        }, (error) => {
          console.log("err", error);
        }));
    }
  }

  createConfig() {
    var newConfig: Config = new Config();
    newConfig.date_from = this.newFrom;
    newConfig.date_to = this.newTo;

    this.newFrom = undefined;
    this.newTo = undefined;

    console.log('Adding new config: ')
    console.log(newConfig)
    this.sub.add(this.configService.createConfig(newConfig)
      .subscribe((data) => {
        console.log(data);
        this.sub.add(this.configService.getConfigs()
          .subscribe(configs => {
            this.store.dispatch(new StateActions.ChangeConfigs(configs))
          }))

      }, (error) => {
        console.log("err", error);
      }));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}


