import { Component, Input, OnInit, Signal, ViewChild } from '@angular/core';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../entities/teacher';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AddressApi } from '../utils/address-api';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.css']
})

export class TeacherCreateComponent implements OnInit {

  teacher: Teacher = new Teacher();

  addressApi: AddressApi = new AddressApi();

  formData = this.formBuilder.group({
    name: ['', Validators.required], email: ['', Validators.email], valueHour: ['', Validators.required], publicPlace: '',
    complement: '', neighborhood: '', city: '', state: '', zipCode: '', number: ''
  });

  constructor(private teacherService: TeacherService, private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void { }

  addTeacher() {
    console.warn('formData:', this.formData.value);
    this.formDataToTeacher()
    this.teacherService.save(this.teacher);
    window.alert("Professor adicionado com sucesso!");
    this.router.navigate(["/teacher-list"]);
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
    this.teacher.name = this.formData.get('name')?.value!!;
    this.teacher.email = this.formData.get('email')?.value!!;
    this.teacher.address.publicPlace = this.formData.get('publicPlace')?.value!!;
    this.teacher.address.neighborhood = this.formData.get('neighborhood')?.value!!;
    this.teacher.address.city = this.formData.get('city')?.value!!;
    this.teacher.address.state = this.formData.get('state')?.value!!;
    this.teacher.address.number = this.formData.get('number')?.value!!;
    this.teacher.address.complement = this.formData.get('complement')?.value!!;
    this.teacher.address.zipCode = this.formData.get('zipCode')?.value!!;
    this.teacher.valueHour = parseFloat(this.formData.get('valueHour')?.value!!);
  }

}