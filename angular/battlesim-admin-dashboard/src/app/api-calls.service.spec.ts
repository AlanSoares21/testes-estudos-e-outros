import { TestBed } from '@angular/core/testing';

import { ApiCallsService } from './api-calls.service';
import { HttpClient, HttpClientModule, HttpHeaderResponse, HttpHeaders, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { Observable } from 'rxjs';
import { DashboardMetricsResponse } from './dashboard-metrics-response';
import { StorageService } from './storage.service';
import { Player } from './player';
import { LogData } from './log-data';

function spyForObj<T>() {
  return jasmine.createSpyObj<Observable<T>>('Observable', ['pipe'])
}

const authToken = "token"

type httpOptionsHeader = HttpHeaders | {[header: string]: string | string[];}

function isHttpHeaders(value: httpOptionsHeader): value is HttpHeaders {
  return typeof value.has === 'function'
}

const authHeaderMatch: jasmine.CustomMatcher = {
  compare: (actual?: httpOptionsHeader | null) => {
    
    const result: jasmine.CustomMatcherResult = {pass: false}
    if (actual === undefined || actual === null) {
      result.message = 'actual value is undefined or null'
      return result
    }

    if (isHttpHeaders(actual)) {
      if (!actual.has('Authorization')) {
        result.message = `header dont have an Authorization key. Keys: ${actual.keys()}`
        return result
      }
  
      const headerValue = actual.get('Authorization')
      
      if (headerValue !== null && headerValue === `Bearer ${authToken}`)
        result.pass = true
      else
        result.message = `authorization header dont have the expected token. Header value: ${headerValue}`
      
        return result
    }
    
    const token = actual['Authorization']
    if (token === undefined || token === null) {
      result.message = `actual is not an http headers instance, and the token value is null or undefined. Token: ${token} - Actual: ${actual}`
      return result
    }
    if (token === `Bearer ${authToken}`)
      result.pass = true
    else
      result.message = `actual is not an http headers instance, and the token value is not equal to the expected token. Token value: ${token} - Actual: ${actual}`
    return result
    
  }
}

describe('ApiCallsService', () => {
  let service: ApiCallsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let storageSpy: jasmine.SpyObj<StorageService>;

  function getAuhtenticatedEndpoint(endpoint: string) {
    const url = httpClientSpy.get.calls.argsFor(0)[0]
    expect(url.endsWith(endpoint))
      .withContext(`url ${url} dont ends with the correct endpoint ${endpoint}`)
      .toBeTrue()
  
    const opt = httpClientSpy.get.calls.argsFor(0)[1]
    expect(opt)
      .withContext(`opt is undefined when get endpoint ${endpoint}`)
      .not.toBeUndefined()
    if (opt === undefined)
      return;
  
    expect(opt.headers)
      .withContext(`opt headers is undefined when get endpoint ${endpoint}`)
      .not.toBeUndefined()
    
    const compareResult = authHeaderMatch.compare(opt.headers)
    expect(compareResult.pass)
      .withContext(`${compareResult.message} when get endpoint ${endpoint}`)
      .toBeTrue()
  }

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

    storageSpy = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>
    storageSpy.getAuthToken.and.returnValue(authToken)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('correct calls Dashboard metrics endpoint', () => {
    httpClientSpy.get.and.returnValue(spyForObj<DashboardMetricsResponse>())
    service.GetDashboardMetrics()
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1)
    
    getAuhtenticatedEndpoint('/DashboardMetrics')
  });

  it('correct call list players endpoint', () => {
    httpClientSpy.get.and.returnValue(spyForObj<Player[]>())
    service.GetPlayers()
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1)
    
    getAuhtenticatedEndpoint('/Players')
  });

  it('correct call list blacklisted players endpoint', () => {
    httpClientSpy.get.and.returnValue(spyForObj<Player[]>())
    service.GetBlacklistedPlayers()
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1)
    
    getAuhtenticatedEndpoint('/Blacklist')
  });

  it('correct call list logs endpoint', () => {
    httpClientSpy.get.and.returnValue(spyForObj<LogData[]>())
    service.GetLogs()
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1)
    
    getAuhtenticatedEndpoint('/Logs')
  });
});
