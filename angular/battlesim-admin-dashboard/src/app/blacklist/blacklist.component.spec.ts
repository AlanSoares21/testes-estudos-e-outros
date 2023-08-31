import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistComponent } from './blacklist.component';
import { ApiCallsService } from '../api-calls.service';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Player } from '../player';

function spySubscription() {
  return jasmine.createSpyObj<Subscription>('Subscription', ['add', 'closed', 'remove', 'unsubscribe'])
}

describe('BlacklistComponent', () => {
  let component: BlacklistComponent;
  let fixture: ComponentFixture<BlacklistComponent>;

  beforeEach(() => {
    const api = jasmine.createSpyObj<ApiCallsService>('ApiCallsService', ['GetBlacklistedPlayers'])

    const firstObservable = jasmine
    .createSpyObj<Observable<Player[]>>('Observable', ['subscribe'])
    
    firstObservable.subscribe.and
    .returnValue(spySubscription())
    
    api.GetBlacklistedPlayers.and.returnValue(firstObservable)

    TestBed.configureTestingModule({
      declarations: [BlacklistComponent],
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
    fixture = TestBed.createComponent(BlacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
