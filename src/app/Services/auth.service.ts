import { Injectable, Inject } from '@angular/core';
import { LogoutUser } from '../store/Actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private store: Store<AppState>,
    @Inject('LOCALSTORAGE') private localStorage: any
  ) { }

  getToken(): string {
    return this.localStorage.getItem('token');
  }

  isLoggedIn() {
    const token = this.getToken();
    return token != null;
  }
}
