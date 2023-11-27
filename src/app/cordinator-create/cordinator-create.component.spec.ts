import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CordinatorCreateComponent } from './cordinator-create.component';

describe('CordinatorCreateComponent', () => {
  let component: CordinatorCreateComponent;
  let fixture: ComponentFixture<CordinatorCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CordinatorCreateComponent]
    });
    fixture = TestBed.createComponent(CordinatorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
