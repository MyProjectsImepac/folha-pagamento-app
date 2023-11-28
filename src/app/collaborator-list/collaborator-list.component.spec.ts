import { ComponentFixture, TestBed } from '@angular/core/testing';

import { collaboratorListComponent } from './collaborator-list.component';

describe('CollaboratorListComponent', () => {
  let component: collaboratorListComponent;
  let fixture: ComponentFixture<collaboratorListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [collaboratorListComponent]
    });
    fixture = TestBed.createComponent(collaboratorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
