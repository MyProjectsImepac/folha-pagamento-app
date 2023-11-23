import { Component, OnInit } from '@angular/core';
import { Collaborator } from '../entities/collaborator';
import { Observable } from 'rxjs';
import { CollaboratorService } from '../services/collaborator-service/collaborator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.css']
})

export class collaboratorListComponent implements OnInit {

  collaborators: Collaborator[] = [];
  hasCollaboratorsEmpty: boolean = true;

  constructor(private collaboratorService: CollaboratorService, private router: Router) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.collaboratorService.findAll().subscribe(
      collaboratorApi => {
        this.collaborators = collaboratorApi as Collaborator[];
        this.hasCollaboratorsEmpty = this.collaborators.length == 0;
        console.log("this.collaborators::", this.collaborators);
      }
    );
  }

  deleteCollaborator(id: number) {
    this.collaboratorService.delete(id);
    location.reload();
  }

  updateCollaborator(id: number) {
    this.router.navigate(['/collaborator-update', id]);
  }

}
