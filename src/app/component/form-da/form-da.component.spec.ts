import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDaComponent } from './form-da.component';

describe('FormDaComponent', () => {
  let component: FormDaComponent;
  let fixture: ComponentFixture<FormDaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDaComponent]
    });
    fixture = TestBed.createComponent(FormDaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
