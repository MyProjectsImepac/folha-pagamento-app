import { Component } from '@angular/core';
import { CordinatorService } from '../services/cordinator.service';
import { Cordinator } from '../entities/cordinator';
import { UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AddressApi } from '../utils/address-api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cordinator-create',
  templateUrl: './cordinator-create.component.html',
  styleUrls: ['./cordinator-create.component.css']
})
export class CordinatorCreateComponent {
  cordinator: Cordinator | undefined = this.activatedRoute.snapshot.data['cordinator'];
  typeModule: string="";
  routeData: any;

  addressApi: AddressApi = new AddressApi();

  formData = this.formBuilder.group({
    id: new FormControl<string>(''), 
    name: new FormControl<string>('', [Validators.required]), 
    email: new FormControl<string>('', [Validators.required]), 
    percentsStudent: new FormControl<Number | null>(null, [Validators.required]), 
    valuePayments: new FormControl<Number | null>(null, [Validators.required]), 
    amountStudents: new FormControl<Number | null>(null, [Validators.required]), 
    address: this.formBuilder.group({
      publicPlace: new FormControl<string>('', [Validators.required]), 
      complement: new FormControl<string>('', [Validators.required]), 
      neighborhood: new FormControl<string>('', [Validators.required]), 
      city: new FormControl<string>('', [Validators.required]), 
      state: new FormControl<string>('', [Validators.required]),
      zipCode: new FormControl<string>('', [Validators.required]),
      number: new FormControl<string>('', [Validators.required])
    })
  });

  constructor(private cordinatorService: CordinatorService, private formBuilder: UntypedFormBuilder, private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.cordinator ? this.typeModule = 'Editar' : this.typeModule = 'Registrar';

    this.formData.patchValue({
      id: this.cordinator?.id, 
      name: this.cordinator?.name, 
      email: this.cordinator?.email, 
      percentsStudent: this.cordinator?.percentsStudent, 
      valuePayments: this.cordinator?.valuePayments, 
      amountStudents: this.cordinator?.amountStudents,
      address: {
        publicPlace: this.cordinator?.address?.publicPlace,
        complement: this.cordinator?.address?.complement,
        neighborhood: this.cordinator?.address?.neighborhood, 
        city: this.cordinator?.address?.city, 
        state: this.cordinator?.address?.state, 
        zipCode: this.cordinator?.address?.zipCode, 
        number: this.cordinator?.address?.number
      } 
    });
   }

  saveCordinator() {
    this.cordinatorService.save(this.formData.value).subscribe({
      next: result => {
        window.alert(`Coordenador ${this.formData.value.id ? "editado" : "adicionado"} com sucesso!`);
        this.router.navigate(["/cordinator-list"]);
      },
      error: error => {
        window.alert(`Erro ao ${this.formData.value.id ? "editar": "adicionar"} o coordenador!`);
      }
    });
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
}
