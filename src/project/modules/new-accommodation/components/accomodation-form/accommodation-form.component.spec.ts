import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationFormComponent } from './dormitory-form.component';

describe('DormitoryFormComponent', () => {
  let component: AccomodationFormComponent;
  let fixture: ComponentFixture<AccomodationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccomodationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccomodationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
