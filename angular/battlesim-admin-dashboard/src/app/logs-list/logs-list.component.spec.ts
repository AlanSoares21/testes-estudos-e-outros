import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsListComponent } from './logs-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { ApiCallsService } from '../api-calls.service';
import { Observable, Subscription } from 'rxjs';
import { LogData } from '../log-data';

function spySubscription() {
  return jasmine.createSpyObj<Subscription>('Subscription', ['add', 'closed', 'remove', 'unsubscribe'])
}

describe('LogsListComponent', () => {
  let component: LogsListComponent;
  let fixture: ComponentFixture<LogsListComponent>;

  beforeEach(() => {
    const api = jasmine.createSpyObj<ApiCallsService>('ApiCallsService', ['GetLogs'])

    const firstObservable = jasmine
    .createSpyObj<Observable<LogData[]>>('Observable', ['subscribe'])
    
    firstObservable.subscribe.and
    .returnValue(spySubscription())
    
    api.GetLogs.and.returnValue(firstObservable)

    TestBed.configureTestingModule({
      declarations: [LogsListComponent],
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
    fixture = TestBed.createComponent(LogsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
