import { Component, OnInit } from '@angular/core';
import { Collaborator } from '../entities/collaborator';
import { CollaboratorService } from '../services/collaborator-service/collaborator.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-collaborator-details',
  templateUrl: './collaborator-details.component.html',
  styleUrls: ['./collaborator-details.component.css']
})

export class CollaboratorDetailsComponent implements OnInit {

  collaborator: Collaborator = new Collaborator();

  constructor(private collaboratorService: CollaboratorService, private activatedRoute: ActivatedRoute) {
    this.collaborator = new Collaborator();
  }

  ngOnInit(): void {
    this.loadDataCollaborator();
  }

  loadDataCollaborator() {
    let idLink: any = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("id::", idLink);
    this.collaboratorService.findById(idLink).subscribe(
      (collaboratorApi) => {
        console.log("collaboratorApi::", collaboratorApi);
        this.collaborator = collaboratorApi as Collaborator;
      }
    );
  }
}
