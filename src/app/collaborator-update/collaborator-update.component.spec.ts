import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorUpdateComponent } from './collaborator-update.component';

describe('CollaboratorUpdateComponent', () => {
  let component: CollaboratorUpdateComponent;
  let fixture: ComponentFixture<CollaboratorUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollaboratorUpdateComponent]
    });
    fixture = TestBed.createComponent(CollaboratorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
