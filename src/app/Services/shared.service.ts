import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constants';
import { Role } from '../models/role.model';
import { TipoDocumento } from '../models/tipoDocumento';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    constructor(private http: HttpClient) { }

    getRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(`${Constants.API_ENDPOINT}/${Constants.PATH_CARGOS}`);
    }

    getTipoDocumentos(): Observable<TipoDocumento[]> {
        return this.http.get<TipoDocumento[]>(`${Constants.API_ENDPOINT}/${Constants.PATH_TIPO_DOCUMENTOS}`);
    }
}
