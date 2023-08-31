import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { ApiCallsService } from '../api-calls.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { DashboardMetricsResponse } from '../dashboard-metrics-response';
import { Observable, Subscription } from 'rxjs';

function spySubscription() {
  return jasmine.createSpyObj<Subscription>('Subscription', ['add', 'closed', 'remove', 'unsubscribe'])
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    const api = jasmine.createSpyObj<ApiCallsService>('ApiCallsService', ['GetDashboardMetrics'])

    const firstObservable = jasmine
    .createSpyObj<Observable<DashboardMetricsResponse>>('Observable', ['subscribe'])
    
    firstObservable.subscribe.and
    .returnValue(spySubscription())
    
    api.GetDashboardMetrics.and.returnValue(firstObservable)
    
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        AppRoutingModule
      ],
      providers: [
        {
          provide: ApiCallsService, 
          useValue: api
        }
      ]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
