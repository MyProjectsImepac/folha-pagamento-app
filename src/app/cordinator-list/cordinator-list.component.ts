import { Component } from '@angular/core';
import { Cordinator } from '../entities/cordinator';
import { CordinatorService } from '../services/cordinator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cordinator-list',
  templateUrl: './cordinator-list.component.html',
  styleUrls: ['./cordinator-list.component.css']
})
export class CordinatorListComponent {
  cordinators: Cordinator[] = [];
  hasCordinatorsEmpty: boolean = true;

  constructor(private cordinatorService: CordinatorService, router: Router) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.cordinatorService.findAll().subscribe(
      cordinatorApi => {
        this.cordinators = cordinatorApi as Cordinator[];
        this.hasCordinatorsEmpty = this.cordinators.length == 0;
      }
    );
  }

  deleteCordinator(id: number) {
    const confirm = window.confirm("Tem certeza que deseja deletar o coordenador?");
    if (confirm) {
      this.cordinatorService.delete(id).subscribe({
        next: result => {
          window.alert("Coordenador excluido com sucesso!");
          location.reload();  
        },
        error: error => {
          window.alert("Erro ao deletar o coordenador!");
        }
      });
    }
  }
}
