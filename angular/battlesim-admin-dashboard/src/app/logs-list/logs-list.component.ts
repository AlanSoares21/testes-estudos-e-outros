import { Component } from '@angular/core';
import { LogData } from '../log-data';
import { ApiCallsService } from '../api-calls.service';
import { TableComponent } from '../table/table.component';
import { TableHeader } from '../table-header';

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.css'],
  providers: [TableComponent]
})
export class LogsListComponent {
  logs: LogData[] = []
  headers: TableHeader[] = [
    {id: 'type', fieldName: 'type', displayText: 'Type', width: '10%'},
    {id: 'message', fieldName: 'message', displayText: 'Message'},
    {id: 'hour', width: '10%', displayText: 'Hour'},
    {id: 'check', width: '5%', displayText: 'Check', 
      input: {
        type: 'checkbox',
        checked: (data: LogData) => data.checked,
        disabled: (data: LogData) => data.checked
      }
    }
  ]

  constructor(private api: ApiCallsService) {}

  ngOnInit() {
    this.api.GetLogs()
      .subscribe(value => {
        this.logs = value
      })
  }
}
