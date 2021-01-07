import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishFormComponent } from './finish-form.component';

describe('FinishFormComponent', () => {
  let component: FinishFormComponent;
  let fixture: ComponentFixture<FinishFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
