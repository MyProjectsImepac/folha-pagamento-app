import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Cordinator } from '../entities/cordinator';

import { CordinatorService } from '../services/cordinator.service';

@Injectable({
  providedIn: 'root'
})
export class CordinatorResolver implements Resolve<Cordinator> {

  constructor(private service: CordinatorService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    if (route.params && route.params['id']) {
      return this.service.findById(route.params['id']);
    }
    return of({
      id: '',
      name: '',
      email: '',
      percentsStudent: '', 
      valuePayments: '', 
      amountStudents: '',
      address: {
          publicPlace: '',
          complement: '',
          neighborhood: '',
          city: '',
          number: '',
          state: '',
          zipCode: ''
      }
    });
  }
};
