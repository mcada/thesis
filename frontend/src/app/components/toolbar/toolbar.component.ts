import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { Config } from 'src/app/models/config.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  configs: Config[]
  selectedConfig: Config

  constructor(private configService: ConfigService) {
    this.configService.allConfigs$.subscribe(data => {
      console.log('found some config data: ')
      console.log(data)
      this.configs = data;
    })

    this.configService.currentConfig$.subscribe(data => {
      this.selectedConfig = data;
    })
  }

  ngOnInit() {

  }


  setConfig(config: Config) {
    this.configService.setCurrentConfig(config);
  }

}
