import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CordinatorListComponent } from './cordinator-list.component';

describe('CordinatorListComponent', () => {
  let component: CordinatorListComponent;
  let fixture: ComponentFixture<CordinatorListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CordinatorListComponent]
    });
    fixture = TestBed.createComponent(CordinatorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
