import { Role } from './role.model';

export class User {
    public id: number;
    public nombre: string;
    public apellidos: string;
    public fechaNacimiento: Date;
    public email: string;
    public clave: string;
    public role: Role;
    public estado: boolean;
}
