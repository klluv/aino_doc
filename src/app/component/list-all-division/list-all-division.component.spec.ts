import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllDivisionComponent } from './list-all-division.component';

describe('ListAllDivisionComponent', () => {
  let component: ListAllDivisionComponent;
  let fixture: ComponentFixture<ListAllDivisionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAllDivisionComponent]
    });
    fixture = TestBed.createComponent(ListAllDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
