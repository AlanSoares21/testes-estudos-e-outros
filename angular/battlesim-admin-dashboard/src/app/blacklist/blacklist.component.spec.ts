import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistComponent } from './blacklist.component';
import { ApiCallsService } from '../api-calls.service';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';

describe('BlacklistComponent', () => {
  let component: BlacklistComponent;
  let fixture: ComponentFixture<BlacklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlacklistComponent],
      imports: [
        HttpClientModule,
        AppRoutingModule
      ],
      providers: [
        ApiCallsService
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
