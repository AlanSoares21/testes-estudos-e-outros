import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { DashboardMetricsResponse } from './dashboard-metrics-response';
import { ApiError } from './api-error';
import { ActivatedRoute } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { isApiError } from './type-check';
import { LogData } from './log-data';
import { Player } from './player';
import { StorageService } from './storage.service';

function handleError(error: HttpErrorResponse) {
  let message: string;
  if (error.status === 0 || !isApiError(error.error)) {
    console.error('An error ocurred in the client', error.error)
    message = `An error ocurred in the client. Error ${(error.error as Error).message}`
  }
  else {
    console.error('An error ocurred', error.error)
    message = `An error ${error.status} ocurred. ${error.error.message}`
  }
  return throwError(() => new Error(message))
}

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {
  
  constructor(
    private client: HttpClient,
    private storage: StorageService) {}

  SetAccessToken(accessToken: string) {
    this.storage.setAuthToken(accessToken)
  }

  private GetHeaders() {
    return new HttpHeaders()
      .append('Authorization', `Bearer ${this.storage.getAuthToken()}`)
  }

  GetDashboardMetrics() {
    const headers = this.GetHeaders()
    return this.client.get<DashboardMetricsResponse>(
      `${environment.apiUrl}/DashboardMetrics`, 
      {headers}
    ).pipe(catchError(handleError))
  }

  GetLogs() {
    const headers = this.GetHeaders()
    return this.client.get<LogData[]>(
      `${environment.apiUrl}/Logs`, 
      {headers}
    ).pipe(catchError(handleError))
  }

  GetPlayers() {
    return this.client.get<Player[]>(
      `${environment.apiUrl}/Players`, 
      {headers: this.GetHeaders()}
    ).pipe(catchError(handleError))
  }

  SendPlayerToBlacklist(player: Player) {
    return this.client.post<Player>(
      `${environment.apiUrl}/Blacklist`, {player}, 
      {headers: this.GetHeaders()}
    ).pipe(catchError(handleError))
  }

  GetBlacklistedPlayers() {
    return this.client.get<Player[]>(
      `${environment.apiUrl}/Blacklist`,
      {headers: this.GetHeaders()}
    ).pipe(catchError(handleError))
  }

  RemovePlayerFromBlacklist(id: Player['id']) {
    return this.client.delete(
      `${environment.apiUrl}/Blacklist/${id}`,
      {headers: this.GetHeaders()}
    ).pipe(catchError(handleError))
  }
}
