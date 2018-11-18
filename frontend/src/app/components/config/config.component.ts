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
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit, OnDestroy {
  newFrom: Date;
  newTo: Date;
  jiraLastUpdate: String;

  displayedColumns: string[] = ['from', 'to', 'action'];

  state: Observable<State>;
  private sub: Subscription;

  constructor(public snackBar: MatSnackBar, private reviewService: ReviewService, private store: Store<State>, private configService: ConfigService) {
    this.sub = new Subscription();
    this.state = store.select('state');
  }

  ngOnInit() {
    this.sub.add(this.configService.lastJiraUpdate().subscribe(data => {
      this.jiraLastUpdate = data
    }))
  }

  updateFromJira() {
    if (window.confirm('Older jira tasks will not be loaded if you add new employee after update. Continue?')) {
      this.sub.add(this.configService.updateFromJira().subscribe(res => {
        console.log(res)

        this.sub.add(this.configService.lastJiraUpdate().subscribe(data => {
          this.jiraLastUpdate = data

          this.snackBar.open('Uploading jira tasks...', 'OK', {
            duration: 3000,
          });
        }))
      }))
    }
  }

  setConfig(config: Config) {
    this.store.dispatch(new StateActions.ChangeConfig(config))
    this.sub.add(this.reviewService.loadReviews(config._id).subscribe(data => {
      this.store.dispatch(new StateActions.ChangeReviews(data))

      this.snackBar.open('Current period was changed', 'OK', {
        duration: 2000,
      });
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


