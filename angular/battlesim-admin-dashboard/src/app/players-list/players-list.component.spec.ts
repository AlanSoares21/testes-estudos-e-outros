import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersListComponent } from './players-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { ApiCallsService } from '../api-calls.service';
import { Observable, Subscription } from 'rxjs';
import { Player } from '../player';

function spySubscription() {
  return jasmine.createSpyObj<Subscription>('Subscription', ['add', 'closed', 'remove', 'unsubscribe'])
}

describe('PlayersListComponent', () => {
  let component: PlayersListComponent;
  let fixture: ComponentFixture<PlayersListComponent>;

  beforeEach(() => {
    const api = jasmine.createSpyObj<ApiCallsService>('ApiCallsService', ['GetPlayers'])

    const firstObservable = jasmine
    .createSpyObj<Observable<Player[]>>('Observable', ['subscribe'])
    firstObservable.subscribe.and
    .returnValue(spySubscription())
    api.GetPlayers.and.returnValue(firstObservable)

    TestBed.configureTestingModule({
      declarations: [PlayersListComponent],
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
    fixture = TestBed.createComponent(PlayersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
