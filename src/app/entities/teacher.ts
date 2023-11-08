import { Address } from "../utils/address";

export class Teacher {
    id: number | null = null;
    name: string = '';
    email: string = '';
    valueHour: number = 0;
    address: Address = new Address();
}
