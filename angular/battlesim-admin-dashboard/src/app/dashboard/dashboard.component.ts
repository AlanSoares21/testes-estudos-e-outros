import { Component } from '@angular/core';
import { ApiCallsService } from '../api-calls.service';
import { ApiError } from '../api-error';
import { TypeCheck } from '../type-check';
import { DashboardMetricsResponse } from '../dashboard-metrics-response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  data?: DashboardMetricsResponse
  gettingDashboardData: boolean = false

  constructor(private api: ApiCallsService,
    private typeCheck: TypeCheck) {}

  ngOnInit() {
    this.gettingDashboardData = true
    this.api.GetDashboardMetrics().subscribe(value => {
      if (this.typeCheck.isApiError(value))
        alert(`Error on getting dashboard data. Error: ${value.message}`)
      else
        this.data = value
      this.gettingDashboardData = false
    })
  }
}
