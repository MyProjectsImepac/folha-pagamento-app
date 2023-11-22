import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Collaborator } from '../entities/collaborator';
import { AddressApi } from '../utils/address-api';
import { HttpClient } from '@angular/common/http';
import { CollaboratorService } from '../services/collaborator-service/collaborator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collaborator-update',
  templateUrl: './collaborator-update.component.html',
  styleUrls: ['./collaborator-update.component.css']
})
export class CollaboratorUpdateComponent implements OnInit {

  showErrorAlert: boolean = false;

  ngOnInit(): void {
  }
  constructor(private formBuilder: FormBuilder, private collaborator: Collaborator, private httpClient: HttpClient, private collaboratorService: CollaboratorService, private router: Router) { }

  formData = this.formBuilder.group({
    name: ['', Validators.required], email: ['', [Validators.email, Validators.required]], valueHour: ['', Validators.required], publicPlace: '',
    complement: '', neighborhood: '', city: '', state: '', zipCode: '', number: ''
  });

  updateCollaborator() {
    this.formDataToCollaborator();
    this.collaboratorService.edit(this.collaborator).subscribe(
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
  formDataToCollaborator() {
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
