import { Component, OnInit } from '@angular/core';
import { Teacher } from '../entities/teacher';
import { AddressApi } from '../utils/address-api';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Collaborator } from '../entities/collaborator';
import { HttpClient } from '@angular/common/http';
import { CollaboratorService } from '../services/collaborator-service/collaborator.service';
import { TeacherService } from '../services/teacher.service/teacher.service';

@Component({
  selector: 'app-teacher-update',
  templateUrl: './teacher-update.component.html',
  styleUrls: ['./teacher-update.component.css']
})
export class TeacherUpdateComponent implements OnInit {

  showErrorAlert: boolean = false;

  ngOnInit(): void {
    this.initializeObject();
  }
  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, 
    private teacher: Teacher, private httpClient: HttpClient, 
    private teacherService: TeacherService, private router: Router) { }

  formData = this.formBuilder.group({
    name: ["", Validators.required], email: ['', [Validators.email, Validators.required]], valueHour: ['', Validators.required], publicPlace: '',
    complement: '', neighborhood: '', city: '', state: '', zipCode: '', number: ''
  });

  initializeObject() {
    let idLink: any = this.activatedRoute.snapshot.paramMap.get('id');
    this.teacherService.findById(idLink).subscribe(
      (teacherApi) => {
        this.teacher = teacherApi as Teacher;
        this.getPreviousData(this.teacher);
      });
  }

  updateTeacher() {
    this.formDataToTeacher();
    this.teacherService.put(this.teacher).subscribe(
      (data) => {
        this.router.navigate(["/teacher-list"]);
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
  getPreviousData(teacher: Teacher) {
    this.formData.patchValue({
      name: this.teacher.name,
      email: this.teacher.email,
      publicPlace: this.teacher.address.publicPlace,
      neighborhood: this.teacher.address.neighborhood,
      city: this.teacher.address.city,
      state: this.teacher.address.state,
      number: this.teacher.address.number,
      complement: this.teacher.address.complement,
      zipCode: this.teacher.address.zipCode,
      valueHour: this.teacher.valueHour.toString()
    });
  }

}
