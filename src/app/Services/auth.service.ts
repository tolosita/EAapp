import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject('LOCALSTORAGE') private localStorage: any,
    private http: HttpClient
  ) { }

  getToken(): string {
    return this.localStorage.getItem('token');
  }

  isLoggedIn() {
    const token = this.getToken();
    return token != null;
  }

  recuperarClave(email: string) {
    return this.http.post(`${Constants.API_ENDPOINT}/${Constants.PATH_RECUPERAR}`, email).toPromise();
  }

  restablecerClave(id: number, clave: string) {
    return this.http.post(`${Constants.API_ENDPOINT}/${Constants.PATH_RESTABLECER}/${id}`, clave).toPromise();
  }
}
