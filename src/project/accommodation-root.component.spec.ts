import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationRootComponent } from './accommodation-root.component';

describe('AccomodationRootComponent', () => {
  let component: AccommodationRootComponent;
  let fixture: ComponentFixture<AccommodationRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommodationRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
