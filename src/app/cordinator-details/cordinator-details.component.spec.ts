import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CordinatorDetailsComponent } from './cordinator-details.component';

describe('CordinatorDetailsComponent', () => {
  let component: CordinatorDetailsComponent;
  let fixture: ComponentFixture<CordinatorDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CordinatorDetailsComponent]
    });
    fixture = TestBed.createComponent(CordinatorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
