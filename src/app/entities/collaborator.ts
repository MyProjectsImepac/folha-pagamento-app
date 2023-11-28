import { Address } from "../utils/address";

export class Collaborator {
    id: number | null = null;
    name: string = '';
    email: string = '';
    valueHour: number = 0;
    address: Address = new Address();
}
