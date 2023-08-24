import { Component } from '@angular/core';
import { LogData } from '../log-data';
import { ApiCallsService } from '../api-calls.service';

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.css']
})
export class LogsListComponent {
  logs: LogData[] = []

  constructor(private api: ApiCallsService) {}

  ngOnInit() {
    this.api.GetLogs()
      .subscribe(value => {
        this.logs = value
      })
  }
}
