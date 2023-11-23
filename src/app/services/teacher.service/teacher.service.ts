import { Injectable } from '@angular/core';
import { Teacher } from '../../entities/teacher';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TeacherService {

  constructor(private httpClient: HttpClient) { }

  save(teacher: Teacher): Observable<any> {
    return this.httpClient.post("http://localhost:8081/folha-pagamento/teacher", teacher)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }
        )
      );
  }

  findById(id: number) {
    return this.httpClient.get(`http://localhost:8081/folha-pagamento/teacher/${id}`);
  }

  findAll() {
    return this.httpClient.get("http://localhost:8081/folha-pagamento/teacher");
  }

  put(teacher: Teacher): Observable<any> {
    return this.httpClient.put(`http://localhost:8081/folha-pagamento/teacher/${teacher.id}`, teacher).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  delete(id: number): void {
    this.httpClient.delete(`http://localhost:8081/folha-pagamento/teacher/${id}`).subscribe();
  }


}
