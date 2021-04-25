import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationHistoryDetailsComponent } from './accommodation-history-details.component';

describe('AccommodationHistoryDetailsComponent', () => {
  let component: AccommodationHistoryDetailsComponent;
  let fixture: ComponentFixture<AccommodationHistoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommodationHistoryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
