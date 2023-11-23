import { Injectable } from "@angular/core";
import { Address } from "../utils/address";

@Injectable({
    providedIn: 'root',
  })

export class Collaborator {
    id: number | null = null;
    name: string = '';
    email: string = '';
    valueHour: number = 0;
    address: Address = new Address();
}
