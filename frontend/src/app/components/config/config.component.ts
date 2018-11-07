import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { Config } from 'src/app/models/config.model';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../models/app-state.model';
import * as StateActions from '../../store/state.actions'


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  currentConfig: Config;
  newFrom: Date;
  newTo: Date;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['from', 'to', 'action'];

  state: Observable<State>;

  constructor(private store: Store<State>, private configService: ConfigService) {
    this.state = store.select('state');

    configService.currentConfig$.subscribe(data => {
      this.currentConfig = data;
    })
  }

  ngOnInit() {
    this.configService.allConfigs$.subscribe(data => this.dataSource.data = data);
  }

  setConfig(config: Config) {
    this.store.dispatch(new StateActions.ChangeConfig(config))
    this.configService.setCurrentConfig(config);
  }

  deleteConfig(config: Config) {
    if (window.confirm('Are sure you want to delete this period? All reviews will be deleted with it.')) {
      this.configService.deleteConfig(config)
        .subscribe((data) => {
          console.log(data);
          this.configService.updateConfigs()
        }, (error) => {
          console.log("err", error);
        });
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
    this.configService.createConfig(newConfig)
      .subscribe((data) => {
        console.log(data);
        this.configService.updateConfigs()

      }, (error) => {
        console.log("err", error);
      });
  }
}


