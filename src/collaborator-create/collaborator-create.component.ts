import { Component, Input, OnInit, Signal, ViewChild } from '@angular/core';
import { CollaboratorService } from '../app/services/collaborator-service/collaborator.service';
import { Collaborator } from '../app/entities/collaborator';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AddressApi } from '../app/utils/address-api';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';


@Component({
  selector: 'app-collaborator-create',
  templateUrl: './collaborator-create.component.html',
  styleUrls: ['./collaborator-create.component.css']
})

export class CollaboratorCreateComponent implements OnInit {

  collaborator: Collaborator = new Collaborator();

  addressApi: AddressApi = new AddressApi();

  showErrorAlert: boolean = false;

  formData = this.formBuilder.group({
    name: ['', Validators.required], email: ['', [Validators.email, Validators.required]], valueHour: ['', Validators.required], publicPlace: '',
    complement: '', neighborhood: '', city: '', state: '', zipCode: '', number: ''
  });

  constructor(private collaboratorService: CollaboratorService, private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void { }

  addCollaborator() {
    this.formDataToTeacher()
    this.collaboratorService.save(this.collaborator).subscribe(
      (data) => {
        this.router.navigate(["/collaborator-list"]);
      },
      (error) => {
        this.showErrorAlert = true;
      }
    );
  }

  getZipCodeData() {
    this.httpClient.get(`https://viacep.com.br/ws/${this.formData.get('zipCode')?.value}/json`).subscribe({
      next: (addressApi) => {
        console.log("addressApi::", addressApi);
        this.addressApiToFormData(addressApi as AddressApi)
      },
      error: (e) => {
        console.error(e);
      },
      complete() {
        console.log("is completed");
      },
    }
    );
  }

  private addressApiToFormData(addressApi: AddressApi) {
    this.formData.patchValue(
      {
        neighborhood: (addressApi).bairro,
        city: (addressApi).localidade,
        state: (addressApi).uf,
        complement: (addressApi).complemento,
        publicPlace: (addressApi).logradouro,
        zipCode: (addressApi).cep
      }
    )
  }

  formDataToTeacher() {
    this.collaborator.name = this.formData.get('name')?.value!!;
    this.collaborator.email = this.formData.get('email')?.value!!;
    this.collaborator.address.publicPlace = this.formData.get('publicPlace')?.value!!;
    this.collaborator.address.neighborhood = this.formData.get('neighborhood')?.value!!;
    this.collaborator.address.city = this.formData.get('city')?.value!!;
    this.collaborator.address.state = this.formData.get('state')?.value!!;
    this.collaborator.address.number = this.formData.get('number')?.value!!;
    this.collaborator.address.complement = this.formData.get('complement')?.value!!;
    this.collaborator.address.zipCode = this.formData.get('zipCode')?.value!!;
    this.collaborator.valueHour = parseFloat(this.formData.get('valueHour')?.value!!);
  }

}