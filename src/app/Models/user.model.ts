import { Role } from './role.model';

export class User {
    public nombre: string;
    public apellidos: string;
    public email: string;
    public clave: string;
    public role: Role;
    public estado: boolean;
}
