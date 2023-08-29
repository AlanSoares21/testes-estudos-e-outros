import { TestBed } from '@angular/core/testing';

import { ApiCallsService } from './api-calls.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

describe('ApiCallsService', () => {
  let service: ApiCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AppRoutingModule
      ]
    });
    service = TestBed.inject(ApiCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
