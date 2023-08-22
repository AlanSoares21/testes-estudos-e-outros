import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { DashboardMetricsResponse } from './dashboard-metrics-response';
import { ApiError } from './api-error';


@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  constructor(private client: HttpClient) { }

  GetDashboardMetrics() {
    return this.client.get<DashboardMetricsResponse | ApiError>(`${environment.apiUrl}/DashboardMetrics`, {
      headers: {
        'cotent-type': 'application/json'
      },
    })
  }
}
