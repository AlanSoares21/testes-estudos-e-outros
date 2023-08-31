import { TestBed } from '@angular/core/testing';

import { ApiCallsService } from './api-calls.service';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { Observable } from 'rxjs';
import { DashboardMetricsResponse } from './dashboard-metrics-response';
import { StorageService } from './storage.service';

function spyForObj<T>() {
  return jasmine.createSpyObj<Observable<T>>('Observable', ['pipe'])
}

const authToken = "token"

describe('ApiCallsService', () => {
  let service: ApiCallsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let storageSpy: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule
      ],
      providers: [
        {
          provide: HttpClient, 
          useValue: jasmine.createSpyObj<HttpClient>('HttpClient', ['get'])
        },
        {
          provide: StorageService, 
          useValue: jasmine.createSpyObj<StorageService>('StorageService', ['setAuthToken', 'getAuthToken'])
        }
      ]
    });
    service = TestBed.inject(ApiCallsService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>
    httpClientSpy.get.and.returnValue(spyForObj<DashboardMetricsResponse>())

    storageSpy = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>
    storageSpy.getAuthToken.and.returnValue(authToken)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('calls the api', () => {
    service.GetDashboardMetrics()
    expect(httpClientSpy.get)
    .toHaveBeenCalledOnceWith(
      jasmine.stringContaining('/DashboardMetrics'), 
      jasmine.anything()
    )
  });

  //todo:: while trying to get dashboard metrics handle errors correct
});
