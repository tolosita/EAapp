import { User } from './user.model';

export class Garantia {
    public id: number;
    public fechaRegistro: string;
    public boutique: string;
    public email: string;
    public telefono: string;
    public referencias: any[];
    public causas: any[];
    public usuario: User;
    public estado: number;
}
