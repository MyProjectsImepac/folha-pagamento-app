import { Injectable } from '@angular/core';
import { Cordinator } from '../entities/cordinator';
import { HttpClient } from '@angular/common/http';
// import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CordinatorService {

  constructor(private httpClient: HttpClient) { }

  save(cordinator: Partial<Cordinator>): Observable<Cordinator> {
    return cordinator.id ? this.edit(cordinator) : this.create(cordinator);
  }

  create(cordinator: Partial<Cordinator>): Observable<Cordinator> {
    return this.httpClient.post<Cordinator>("http://localhost:8080/folha-pagamento/cordinator", cordinator);
  }

  findById(id: number) {
    return this.httpClient.get(`http://localhost:8080/folha-pagamento/cordinator/${id}`);
  }

  findAll() {
    return this.httpClient.get("http://localhost:8080/folha-pagamento/cordinator");
  }

  delete(id: number) {
    return this.httpClient.delete(`http://localhost:8080/folha-pagamento/cordinator/${id}`);
  }

  edit(cordinator: Partial<Cordinator>): Observable<Cordinator> {
    return this.httpClient.put<Cordinator>(`http://localhost:8080/folha-pagamento/cordinator/${cordinator.id}`, cordinator);
  }
}
