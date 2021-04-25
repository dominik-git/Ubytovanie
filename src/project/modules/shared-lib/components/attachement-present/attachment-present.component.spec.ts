import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentPresentComponent } from './attachment-present.component';

describe('AttachementPresentComponent', () => {
  let component: AttachmentPresentComponent;
  let fixture: ComponentFixture<AttachmentPresentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmentPresentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentPresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
