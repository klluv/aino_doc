import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllRoleComponent } from './list-all-role.component';

describe('ListAllRoleComponent', () => {
  let component: ListAllRoleComponent;
  let fixture: ComponentFixture<ListAllRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAllRoleComponent]
    });
    fixture = TestBed.createComponent(ListAllRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
