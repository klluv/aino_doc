import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItcmComponent } from './form-itcm.component';

describe('FormItcmComponent', () => {
  let component: FormItcmComponent;
  let fixture: ComponentFixture<FormItcmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormItcmComponent]
    });
    fixture = TestBed.createComponent(FormItcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
