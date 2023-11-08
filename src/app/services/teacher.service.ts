import { Injectable } from '@angular/core';
import { Teacher } from '../entities/teacher';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TeacherService {

  constructor(private httpClient: HttpClient) { }

  save(teacher: Teacher): void {
    this.httpClient.post("http://localhost:8080/folha-pagamento/teacher", teacher).subscribe(
      {
        next: (response) => {
          console.log(response);
        },
        error: (e) => {
          console.error(e);
        },
        complete() {
          console.log("is completed");
        }
      }
    )
  }

  findById(id: number) {
    return this.httpClient.get(`http://localhost:8080/folha-pagamento/teacher/${id}`);
  }

  findAll() {
    return this.httpClient.get("http://localhost:8080/folha-pagamento/teacher");
  }

  delete(id: number): void {
    this.httpClient.delete(`http://localhost:8080/folha-pagamento/teacher/${id}`).subscribe();
  }

  edit(teacher: Teacher): Teacher {
    throw new Error("Method not implemented");
  }
}
