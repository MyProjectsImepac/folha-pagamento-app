import { Address } from "../utils/address";

export class Cordinator {
    id: number | null = null;
    name: string = '';
    email: string = '';
    percentsStudent: string = '';
    valuePayments: string = '';
    amountStudents: string = '';
    address: Address = new Address();
}
