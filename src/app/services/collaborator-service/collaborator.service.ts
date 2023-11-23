import { Injectable } from '@angular/core';
import { Collaborator } from '../../entities/collaborator';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CollaboratorService {

  constructor(private httpClient: HttpClient) { }

  save(collaborator: Collaborator): Observable<any> {
    return this.httpClient.post("http://localhost:8081/folha-pagamento/collaborator", collaborator)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }
        )
      );
  }

  findById(id: number) {
    return this.httpClient.get(`http://localhost:8081/folha-pagamento/collaborator/${id}`);
  }

  findAll() {
    return this.httpClient.get("http://localhost:8081/folha-pagamento/collaborator");
  }

  delete(id: number): void {
    this.httpClient.delete(`http://localhost:8081/folha-pagamento/collaborator/${id}`).subscribe();
  }

  edit(collaborator: Collaborator): Observable<any> {
    return this.httpClient.put(`http://localhost:8081/folha-pagamento/collaborator/`, collaborator.id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  testando(erro: HttpErrorResponse) {
    console.log
  }
}
